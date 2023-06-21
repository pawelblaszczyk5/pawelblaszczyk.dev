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
	reactStrictMode: true,
};

export default nextConfig;
