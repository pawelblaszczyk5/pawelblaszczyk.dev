import { join } from "node:path";
import { createClient } from "redis";
import { match } from "ts-pattern";

import { assert } from "@pawelblaszczyk.dev/assert";

import type { CacheEntryContext, CacheEntryData, CacheHandlerContext } from "#src/types.ts";

import { defer, removeByTagLuaScript } from "#src/utils.ts";

let buildId: string | undefined;

class CacheHandler {
	#buildId: string;
	#cacheHandlerConfigurationPromise: Promise<unknown> | undefined;
	#redisClient: ReturnType<typeof createClient>;

	constructor(context: CacheHandlerContext) {
		const REDIS_DATABASE_URL = process.env["REDIS_DATABASE_URL"];

		assert(REDIS_DATABASE_URL);

		const buildIdPath = join(context.serverDistDir, "../BUILD_ID");

		this.#buildId = buildId ??= context.fs.readFileSync(buildIdPath, { encoding: "utf8" }).toString();
		this.#redisClient = createClient({ url: REDIS_DATABASE_URL });
	}

	async #configureCacheHandler() {
		if (this.#cacheHandlerConfigurationPromise) return this.#cacheHandlerConfigurationPromise;

		const { promise, resolve } = defer();

		this.#cacheHandlerConfigurationPromise = promise;

		await this.#redisClient.connect();
		await this.#createCacheSchema();
		resolve();
		return;
	}

	async #createCacheSchema() {
		await this.#redisClient.json.set(this.#rootKey, "$", {}, { NX: true });
	}

	get #rootKey() {
		return `next-cache-${this.#buildId}`;
	}

	async get(key: string) {
		await this.#configureCacheHandler();

		const matchingCacheEntries = await this.#redisClient.json.get(this.#rootKey, { path: `$["${key}"]` });

		assert(Array.isArray(matchingCacheEntries));

		const cacheEntry = matchingCacheEntries.at(0);

		return cacheEntry;
	}

	resetRequestCache() {
		// NOTE not implemented yet, is it needed?
	}

	async revalidateTag(tag: string) {
		await this.#configureCacheHandler();
		await this.#redisClient.eval(removeByTagLuaScript, { arguments: [tag], keys: [this.#rootKey] });
	}

	async set(key: string, data: CacheEntryData, context: CacheEntryContext) {
		await this.#configureCacheHandler();

		const tags = match(data)
			.with({ kind: "FETCH" }, () => context.tags)
			.with({ kind: "PAGE" }, data => data.headers["x-next-cache-tags"].split(","))
			.exhaustive();

		assert(tags, "Tags should be available");

		await this.#redisClient.json.set(this.#rootKey, `$["${key}"]`, {
			lastModified: Date.now(),
			tags,
			value: data,
		});
	}
}

export default CacheHandler;
