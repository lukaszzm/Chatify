import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration, { validationSchema } from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    PrismaModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
