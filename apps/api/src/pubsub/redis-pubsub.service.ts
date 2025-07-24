import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

@Injectable()
export class RedisPubSubService extends RedisPubSub implements OnModuleInit {
  private readonly logger = new Logger(RedisPubSubService.name);

  constructor(private readonly configService: ConfigService) {
    super({
      publisher: new Redis(configService.getOrThrow<string>("REDIS_URL")),
      subscriber: new Redis(configService.getOrThrow<string>("REDIS_URL")),
    });
  }

  onModuleInit() {
    this.logger.log(`RedisPubSubService initialized`);
  }
}
