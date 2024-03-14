import type { readFileSync } from "node:fs";

export type CacheEntryData =
	| {
			headers: {
				"x-next-cache-tags": string;
			};
			kind: "PAGE";
	  }
	| {
			kind: "FETCH";
	  };

export type CacheEntryContext = { tags?: Array<string> };

export type CacheHandlerContext = {
	fs: {
		readFileSync: typeof readFileSync;
	};
	serverDistDir: string;
};
