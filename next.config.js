/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ["."],
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: true,
		typedRoutes: true,
	},
};

// eslint-disable-next-line unicorn/prefer-module -- Next.js config file
module.exports = nextConfig;
