import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { css, styleSheet } from "@pawelblaszczyk.dev/css";

import "#src/app/main.css";

const inter = Inter({ subsets: ["latin"], variable: "--default-font-family" });

export const metadata = {
	description: "Generated by create next app",
	title: "Create Next App",
} satisfies Metadata;

export const fetchCache = "default-no-store";

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html className={inter.variable} lang="en">
		<body>
			<style dangerouslySetInnerHTML={{ __html: styleSheet() }} />
			<div style={css({ isolation: "isolate" })}>{children}</div>
		</body>
	</html>
);

export default RootLayout;
