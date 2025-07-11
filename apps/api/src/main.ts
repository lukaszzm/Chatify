import { NestFactory } from "@nestjs/core";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { processRequest } from "graphql-upload-ts";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const fastify = adapter.getInstance();

  fastify.addContentTypeParser("multipart", function (request, _payload, done) {
    Object.assign(request, { isMultipart: true });
    done(null);
  });

  fastify.addHook("preValidation", async function (request, reply) {
    if ("isMultipart" in request && !request.isMultipart) {
      return;
    }

    request.body = await processRequest(request.raw, reply.raw);
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, {
    cors: true,
  });

  await app.listen(3000, "0.0.0.0");
}

bootstrap().catch(() => {
  process.exit(1);
});
