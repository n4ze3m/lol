import React from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import DashboardLayout from "Layouts/Dashboard";
import Head from "next/head";
import { SettingsBody } from "components/Me/Settings";

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default function MeHome() {
  return (
    <DashboardLayout>
      <Head>
        <title>Settings / Lol</title>
      </Head>
      <SettingsBody />
    </DashboardLayout>
  );
}
