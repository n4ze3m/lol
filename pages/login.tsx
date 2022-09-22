import LoginBody from "components/Login";
import LandingLayout from "Layouts/Landing";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const LoginPage: NextPage = () => {
  return (
    <LandingLayout>
      <Head>
        <title>Login / Lol</title>
      </Head>
      <LoginBody />
    </LandingLayout>
  );
};

export default LoginPage;
