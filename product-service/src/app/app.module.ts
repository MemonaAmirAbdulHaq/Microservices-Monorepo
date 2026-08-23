import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RedisService } from "../redis/redis.service";
import { RateLimitGuard } from "../guards/rate-limit.guard";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async() => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60
        })
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    RedisService,
    RateLimitGuard
  ]
})
export class AppModule {}