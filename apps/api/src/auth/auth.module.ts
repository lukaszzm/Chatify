import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthResolver } from "@/auth/auth.resolver";
import { AuthService } from "@/auth/auth.service";
import { PasswordService } from "@/auth/password.service";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService, JwtStrategy, PasswordService, ConfigService, AuthResolver],
})
export class AuthModule {}
