import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { config } from "@fortawesome/fontawesome-svg-core";
// import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import TopMenu from "../components/TopMenu";
import MobileMenu from "../components/MobileMenu";

config.autoAddCss = false;

const MyApp: AppType = ({ Component, pageProps }) => {
  const CLERK_PUBLISHABLE_KEY =
    "pk_test_dHJ1c3RlZC1oYXJlLTc4LmNsZXJrLmFjY291bnRzLmRldiQ";

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} {...pageProps}>
      <Head>
        <title>Aglet</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
      <TopMenu />
      <MobileMenu />
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
