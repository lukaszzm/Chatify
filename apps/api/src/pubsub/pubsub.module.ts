import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { RedisPubSubService } from "@/pubsub/redis-pubsub.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisPubSubService],
  exports: [RedisPubSubService],
})
export class PubSubModule {}
