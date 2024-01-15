/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		ppr: true,
		taint: true,
		typedRoutes: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
