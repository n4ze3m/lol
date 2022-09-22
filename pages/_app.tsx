import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./api/trpc/[trpc]";
import { withTRPC } from "@trpc/next";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>
          Lol, I'm not sure what to put here, but I'm sure it's important
        </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "Poppins",
        }}
      >
        <UserProvider supabaseClient={supabaseClient}>
          <Component {...pageProps} />
        </UserProvider>
      </MantineProvider>
    </React.Fragment>
  );
}
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    return {
      url,
    };
  },

  ssr: true,
})(MyApp);
