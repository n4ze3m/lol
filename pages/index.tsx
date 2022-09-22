import { getUser } from "@supabase/auth-helpers-nextjs";
import LandingBody from "components/Home";
import LandingLayout from "Layouts/Landing";
import type { NextPage } from "next";
import Head from "next/head";
export async function getServerSideProps({ req, res } : any) {
  const { user } = await getUser({ req, res }) // Access the user object
  console.log('[getServerSideProps] User:', user)
  return { props: { user } }
}
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
