import { Grid, SimpleGrid } from "@mantine/core";
import { Auth } from "@supabase/ui";
import { Loading } from "components/Common/Loading";
import React from "react";
import { trpc } from "utils/trpc";
import { LolCard } from "./LolCard";

export const HomeBody = () => {
  const { session } = Auth.useUser();
  const { data } = trpc.useQuery(
    [
      "findAllMessages",
      {
        userId: session?.user?.id,
      },
    ],
    {
      enabled: Boolean(session),
    }
  );

  if (!data) {
    return <Loading />;
  }

  const items = data.map((message) => (
    <LolCard key={message.id} {...message} />
  ));

  return (
    <React.Fragment>
      <SimpleGrid
        cols={6}
        my="md"
        breakpoints={[
          { maxWidth: 755, cols: 3, spacing: "sm" },
          { maxWidth: 600, cols: 2, spacing: "sm" },
          { maxWidth: 400, cols: 1, spacing: "sm" },
        ]}
      >
        {items}
      </SimpleGrid>
    </React.Fragment>
  );
};
