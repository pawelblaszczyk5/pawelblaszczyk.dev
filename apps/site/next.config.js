/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	transpilePackages: ["@blog/data", "@blog/css", "@blog/design-system", "@blog/css-reset"],
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
