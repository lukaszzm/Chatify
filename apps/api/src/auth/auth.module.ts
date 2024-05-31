import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "@/auth/auth.service";
import { UsersModule } from "@/users/users.module";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { PasswordService } from "@/auth/password.service";
import { AuthResolver } from "@/auth/auth.resolver";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordService,
    ConfigService,
    AuthResolver,
  ],
})
export class AuthModule {}
