import React from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import DashboardLayout from "Layouts/Dashboard";
import Head from "next/head";
import { ABody } from "components/Me/A";

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default function MeHome() {
  return (
    <DashboardLayout>
      <Head>
        <title>Ah question / Lol</title>
      </Head>
      <ABody />
    </DashboardLayout>
  );
}
