import LandingBody from "components/Home";
import LandingLayout from "Layouts/Landing";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <Head>
        <title>Lol, this is a title</title>
      </Head>
      <LandingBody />
    </LandingLayout>
  );
};

export default Home;
