import { SimpleGrid } from "@mantine/core";
import { message } from "@prisma/client";
import { Loading } from "components/Common/Loading";
import React from "react";
import { LolCard } from "./LolCard";

type LolInbox = {
  data: undefined | message[];
};

export const InboxGrid = ({ data }: LolInbox) => {

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
