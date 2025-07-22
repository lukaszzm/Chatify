import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { and, asc, eq, exists, ilike, inArray, not, or } from "drizzle-orm";
import type { FileUpload } from "graphql-upload-ts";

import { PasswordService } from "@/auth/password.service";
import { DRIZZLE } from "@/drizzle/drizzle.module";
import { chats, participants, users } from "@/drizzle/schema";
import { DrizzleDB } from "@/drizzle/types/drizzle";
import { UploadService } from "@/upload/upload.service";
import { UpdatePasswordInput } from "@/users/dtos/update-password.input";
import { UpdateProfileInfoInput } from "@/users/dtos/update-profile-info.input";
import { UsersArgs } from "@/users/dtos/users.args";
import { CreateUserData } from "@/users/types/user";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly passwordService: PasswordService,
    private readonly uploadService: UploadService
  ) {}

  async findOneWithPasswordByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async findOneByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        password: false,
      },
    });
  }

  async findOneById(id: string) {
    return this.db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: false,
      },
    });
  }

  async findManyByChatId(chatId: string) {
    return this.db.query.users.findMany({
      where: exists(
        this.db
          .select()
          .from(participants)
          .where(and(eq(participants.chatId, chatId), eq(participants.userId, users.id)))
      ),
      columns: {
        password: false,
      },
    });
  }

  async search(args: UsersArgs, userId: string) {
    const searchWhere = or(
      args.excludeMe ? not(eq(users.id, userId)) : undefined,
      ilike(users.fullName, `%${args.where?.fullName}%`),
      ilike(users.firstName, `%${args.where?.firstName}%`),
      ilike(users.lastName, `%${args.where?.lastName}%`),
      ilike(users.email, `%${args.where?.email}%`)
    );

    return this.db.query.users.findMany({
      where: searchWhere,
      orderBy: asc(users.createdAt),
      limit: args.first,
      columns: {
        password: false,
      },
    });
  }

  async create(data: CreateUserData) {
    const [createdUser] = await this.db
      .insert(users)
      .values({
        ...data,
        fullName: `${data.firstName} ${data.lastName}`,
      })
      .returning();

    const { password: _, ...safeCreatedUser } = createdUser;

    return safeCreatedUser;
  }

  async updateInfo(data: UpdateProfileInfoInput, id: string) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
      })
      .where(eq(users.id, id))
      .returning();

    const { password: _, ...safeUpdatedUser } = updatedUser;

    return safeUpdatedUser;
  }

  async updatePassword(data: UpdatePasswordInput, id: string) {
    if (data.newPassword !== data.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    const isPasswordValid = await this.passwordService.verify(
      user.password,
      data.currentPassword
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect current password");
    }

    const hashedPassword = await this.passwordService.hash(data.newPassword);

    const [updatedUser] = await this.db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id))
      .returning();

    const { password: _, ...safeUpdatedUser } = updatedUser;

    return safeUpdatedUser;
  }

  async updateProfilePicture(filePromise: Promise<FileUpload> | null, id: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (user.profilePicture) {
      await this.uploadService.deleteImage(user.profilePicture);
    }

    const isFileProvided = filePromise !== null;
    if (!isFileProvided) {
      return this.db
        .update(users)
        .set({
          profilePicture: null,
        })
        .where(eq(users.id, id));
    }

    const file = await filePromise;
    const pictureUrl = await this.uploadService.uploadImage(file);

    const [updatedUser] = await this.db
      .update(users)
      .set({ profilePicture: pictureUrl })
      .where(eq(users.id, id))
      .returning();

    const { password: _, ...safeUpdatedUser } = updatedUser;

    return safeUpdatedUser;
  }

  async delete(id: string) {
    return this.db.transaction(async (tx) => {
      const user = await tx.query.users.findFirst({
        where: eq(users.id, id),
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (user.profilePicture) {
        await this.uploadService.deleteImage(user.profilePicture);
      }

      const userChats = await tx.query.participants.findMany({
        where: eq(participants.userId, id),
        columns: { chatId: true },
      });

      const chatIds = userChats.map((p) => p.chatId);

      if (chatIds.length > 0) {
        await tx.delete(participants).where(eq(participants.userId, id));
        await tx.delete(chats).where(inArray(chats.id, chatIds));
      }

      const [deletedUser] = await tx.delete(users).where(eq(users.id, id)).returning();
      const { password: _, ...safeDeletedUser } = deletedUser;

      return safeDeletedUser;
    });
  }
}
