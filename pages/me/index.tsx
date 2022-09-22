import React from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import DashboardLayout from "Layouts/Dashboard";
import Head from "next/head";
import { HomeBody } from "components/Me/Home";

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default function MeHome() {
  return (
    <DashboardLayout>
      <Head>
        <title>Me / Lol</title>
      </Head>
      <HomeBody />
    </DashboardLayout>
  );
}
