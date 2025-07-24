import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { graphqlUploadExpress } from "graphql-upload-ts";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>("PORT");

  await app.listen(port, "0.0.0.0");
}

bootstrap().catch(() => {
  process.exit(1);
});
