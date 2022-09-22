import { Skeleton } from "@mantine/core";
import React from "react";

export const Loading = () => {
  return (
    <React.Fragment>
      <Skeleton height={8} />
      <Skeleton height={10} mt="md" />
      <Skeleton height={40} mt="md" />
      <Skeleton height={40} mt="md" />
      <Skeleton height={40} mt="md" />
      <Skeleton height={40} mt="md" />
      <Skeleton height={40} mt="md" />
    </React.Fragment>
  );
};
