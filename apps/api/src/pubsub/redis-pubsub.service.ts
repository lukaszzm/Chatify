import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisPubSub } from "graphql-redis-subscriptions";

@Injectable()
export class RedisPubSubService extends RedisPubSub implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      connection: {
        host: configService.get<string>("REDIS_HOST"),
        port: configService.get<number>("REDIS_PORT"),
      },
    });
  }

  onModuleInit() {
    console.log("RedisPubSubService initialized");
  }
}
