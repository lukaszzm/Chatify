import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisPubSub } from "graphql-redis-subscriptions";

@Injectable()
export class RedisPubSubService extends RedisPubSub implements OnModuleInit {
  private readonly logger = new Logger(RedisPubSubService.name);

  constructor(private readonly configService: ConfigService) {
    super({
      connection: {
        host: configService.getOrThrow<string>("REDIS_HOST"),
        port: configService.getOrThrow<number>("REDIS_PORT"),
      },
    });
  }

  onModuleInit() {
    this.logger.log(`RedisPubSubService initialized`);
  }
}
