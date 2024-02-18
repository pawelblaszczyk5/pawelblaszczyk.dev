/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	transpilePackages: ["@blog/data", "@blog/css"],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
