import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { type FileUpload, GraphQLUpload } from "graphql-upload-ts";

import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { Ratio } from "@/common/enums/ratio";
import { UploadService } from "@/upload/upload.service";

@UseGuards(GqlAuthGuard)
@Resolver(() => GraphQLUpload)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => String)
  async uploadImage(@Args({ name: "file", type: () => GraphQLUpload }) file: FileUpload) {
    return this.uploadService.uploadImage(file, Ratio.SQUARE);
  }
}
