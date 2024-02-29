import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRootDirectory = join(dirname(fileURLToPath(import.meta.url)), "../../");

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		outputFileTracingRoot: monorepoRootDirectory,
	},
	output: "standalone",
	transpilePackages: [
		"@blog/data",
		"@blog/css",
		"@blog/design-system",
		"@blog/css-reset",
		"@blog/database",
		"@blog/environment",
	],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
