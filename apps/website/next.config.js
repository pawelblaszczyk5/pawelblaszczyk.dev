import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRootDirectory = join(dirname(fileURLToPath(import.meta.url)), "../../");

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		outputFileTracingIncludes: {
			"**": ["./node_modules/@pawelblaszczyk.dev/database/drizzle/**/*"],
		},
		outputFileTracingRoot: monorepoRootDirectory,
		ppr: true,
		reactCompiler: true,
		taint: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	output: "standalone",
	transpilePackages: [
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
