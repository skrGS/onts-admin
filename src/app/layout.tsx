import ReduxProvider from "@/store/redux-provider";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import "/src/index.css";
import "@mantine/core/styles.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "crowdfunding",
    "streaming",
    "content creating",
    "atrist",
  ],
  // authors: [
  //   {
  //     name: "bishrelt",
  //     url: siteConfig.url,
  //   },
  // ],
  creator: "onts800",
  openGraph: {
    type: "website",
    locale: "en_US",
    // url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // images: [
    //   {
    //     url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: [siteConfig.ogImage],
    creator: "@teraoshi",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={roboto.className}
      style={{
        height: "100%",
      }}
    >
      <head>
        <link rel="shortcut icon" href="/logo.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        style={{
          height: "100%",
        }}
      >
        <ReduxProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
