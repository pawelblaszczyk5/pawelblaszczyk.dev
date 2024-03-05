import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRootDirectory = join(dirname(fileURLToPath(import.meta.url)), "../../");
const redisCacheHandlerSource = join(dirname(fileURLToPath(import.meta.url)), "./cache-handler.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheHandler: process.env.NODE_ENV === "production" ? redisCacheHandlerSource : undefined,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		outputFileTracingRoot: monorepoRootDirectory,
	},
	output: "standalone",
	transpilePackages: [
		"@pawelblaszczyk.dev/data",
		"@pawelblaszczyk.dev/css",
		"@pawelblaszczyk.dev/design-system",
		"@pawelblaszczyk.dev/css-reset",
		"@pawelblaszczyk.dev/database",
		"@pawelblaszczyk.dev/config",
	],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
