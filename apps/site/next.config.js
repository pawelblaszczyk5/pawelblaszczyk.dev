/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	transpilePackages: ["@blog/data"],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
