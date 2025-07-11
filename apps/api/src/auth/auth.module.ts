import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.getOrThrow<string>("JWT_EXPIRATION_TIME"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, PasswordService, ConfigService, AuthResolver],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
