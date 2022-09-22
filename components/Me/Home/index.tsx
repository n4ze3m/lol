import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Modal,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { Dice3 } from "tabler-icons-react";
import { randomQuestion } from "utils/fun";
import { trpc } from "utils/trpc";
import { InboxGrid } from "./InboxGrid";
import { ProfileCard } from "./ProfileCard";

export const HomeBody = () => {
  const { user } = useUser();
  const [opened, setOpened] = React.useState(false);

  const form = useForm({
    initialValues: {
      question: "",
    },
    validate: {
      question: (value) => {
        return value.length > 0 ? undefined : "Question is required";
      },
    },
  });

  const { data: profile } = trpc.useQuery(
    [
      "findUserProfile",
      {
        userId: user?.id,
      },
    ],
    {
      enabled: Boolean(user?.id),
    }
  );

  const { data: userMessages } = trpc.useQuery(
    [
      "findAllMessages",
      {
        userId: user?.id,
      },
    ],
    {
      enabled: Boolean(user) && Boolean(profile),
    }
  );
  const utils = trpc.useContext();
  const { mutateAsync: updateQuestion, isLoading: isUpdatingQuestion } =
    trpc.useMutation("updateQuestion", {
      onSuccess: () => {
        utils.invalidateQueries(["findUserProfile", { userId: user?.id }]);
        setOpened(false);
        form.reset();
      },
    });

  return (
    <React.Fragment>
      <ProfileCard
        data={profile}
        onEdit={() => {
          setOpened(true);
          form.setFieldValue("question", profile?.question || "");
        }}
      />
      <Divider
        label={
          <Text weight="bold" size="lg">
            Inbox
          </Text>
        }
        size="md"
      />
      <InboxGrid data={userMessages} />
      <Modal opened={opened} onClose={() => setOpened(false)} size="lg">
        <form
          onSubmit={form.onSubmit(async (values) => {
            await updateQuestion({
              question: values.question,
              userId: user!.id,
            });
          })}
        >
          <Textarea
            autosize
            minRows={2}
            placeholder="What's on your mind?"
            {...form.getInputProps("question")}
            rightSection={
              <ActionIcon
                title="Generate a random question"
                onClick={() => {
                  const question = randomQuestion();
                  form.setFieldValue("question", question);
                }}
              >
                <Dice3 />
              </ActionIcon>
            }
          />
          <Group position="right" my="md">
            <Button loading={isUpdatingQuestion} color="teal" type="submit">
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </React.Fragment>
  );
};
