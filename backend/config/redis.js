import Redis from "ioredis";
import { logger } from "../utils/logger.js";

export const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redisClient.on("connect", () => logger.info("Connected to Redis"));
redisClient.on("error", (err) => logger.error({ err }, "Redis connection error"));
