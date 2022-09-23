import { profile } from "@prisma/client";
import { QBody } from "components/U";
import LandingLayout from "Layouts/Landing";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next/types";
import React from "react";
import { database } from "utils/database";

type Props = {
  data: profile;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const user = await database.profile.findFirst({
    where: {
      username: username as string,
    },
  });
  console.log(!user);
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const UserQuestionProfile: NextPage = ({}: any) => {
  return (
    <LandingLayout>
      <Head>
        <title>Hmmm</title>
      </Head>
      <QBody />
    </LandingLayout>
  );
};

export default UserQuestionProfile;
