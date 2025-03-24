import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/app/context/client-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";

import { Open_Sans } from "next/font/google";
import "./globals.scss";

const nunito = Open_Sans({ subsets: ["latin"] });

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className={`${nunito.className} antialiased`}>
				<Provider session={session}>
					<Header />
					{children}
					<Toaster />
					<Footer />
					<Popup />
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
