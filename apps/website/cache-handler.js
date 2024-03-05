import { CacheHandler } from "@neshca/cache-handler";
import createRedisHandler from "@neshca/cache-handler/redis-strings";
import { createClient } from "redis";

const cacheHandler = CacheHandler;

cacheHandler.onCreation(async () => {
	const REDIS_DATABASE_URL = process.env["REDIS_DATABASE_URL"];

	if (!REDIS_DATABASE_URL) throw new Error("Missing REDIS_DATABASE_URL in production");

	const client = createClient({
		url: REDIS_DATABASE_URL,
	});

	client.on("error", error => {
		console.log("Redis unexpected error", error);
	});

	await client.connect();

	const redisHandler = createRedisHandler({
		client,
	});

	return {
		handlers: [redisHandler],
	};
});

export default cacheHandler;
