import {
  ActionIcon,
  Card,
  CopyButton,
  Group,
  Skeleton,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { profile } from "@prisma/client";
import React from "react";
import { Check, Copy, Pencil } from "tabler-icons-react";

type LolProfileCard = {
  data: undefined | profile | null;
  onEdit: () => void;
};

export const ProfileCard = ({ data, onEdit }: LolProfileCard) => {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/u`
    : "http://localhost:3000/u";

  return (
    <Card my="md">
      <Skeleton visible={!Boolean(data)} mb="md">
        <Group>
          <Text size="lg">{data?.question}</Text>
          <ActionIcon
          onClick={onEdit}
          >
            <Pencil size={18} />
          </ActionIcon>
        </Group>
      </Skeleton>
      <Skeleton visible={!Boolean(data)}>
        <Text mb="xs" size="xs" color="dimmed">
          Copy your link
        </Text>
        <TextInput
          value={`${url}/${data?.username}`}
          readOnly
          rightSection={
            <Group>
              <CopyButton value={`${url}/${data?.username}`} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : "Copy"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          }
        />
      </Skeleton>
    </Card>
  );
};
