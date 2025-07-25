import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { graphqlUploadExpress } from "graphql-upload-ts";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>("PORT") || 3000;
  const corsOrigin = configService.getOrThrow<string>("CORS_ORIGIN");

  const maxFileSize = configService.getOrThrow<number>("UPLOAD_MAX_FILE_SIZE");
  const maxFiles = configService.getOrThrow<number>("UPLOAD_MAX_FILES");

  app.enableCors({ origin: corsOrigin, credentials: true });
  app.use(graphqlUploadExpress({ maxFileSize, maxFiles }));

  await app.listen(port, "0.0.0.0");
}

bootstrap().catch(() => {
  process.exit(1);
});
