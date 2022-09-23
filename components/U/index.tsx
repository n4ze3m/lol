import {
  Card,
  Container,
  Skeleton,
  Text,
  Button,
  Textarea,
  ActionIcon,
  Group,
  Avatar,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import React from "react";
import { Dice3 } from "tabler-icons-react";
import { randomAnswer } from "utils/fun";
import { trpc } from "utils/trpc";

export const QBody = () => {
  const router = useRouter();

  const { data: userProfile } = trpc.useQuery(
    [
      "getProfileByUsername",
      {
        username: router.query.username as string,
      },
    ],
    {
      enabled: Boolean(router.query.username),
    }
  );

  const { mutateAsync: createMessage, isLoading: isSubmittingAnswer } =
    trpc.useMutation("answerQuestion", {
      onSuccess: () => {
        showNotification({
          message: "Your answer has been submitted",
        });
      },
      onError: (e: any) => {
        const message =
          e?.response?.data?.message ||
          e?.response?.data?.erorr ||
          e?.message ||
          "Unknown error";
        showNotification({
          message,
          color: "red",
          title: "Error",
        });
      },
    });

  const form = useForm({
    initialValues: {
      answer: "",
    },
    validate: {
      answer: (value) => {
        if (value.length === 0) {
          return "Answer is required";
        }
      },
    },
  });

  // Someone just submitted an message to your question !
  // Click here to see it !

  return (
    <React.Fragment>
      <Container size={500} mt={80}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            await createMessage({
              answer: values.answer,
              question: userProfile?.question,
              userId: userProfile?.id,
            });
          })}
        >
          <Skeleton visible={!userProfile}>
            <Card withBorder shadow="sm" radius="md">
              <Card.Section withBorder inheritPadding py="md">
                <Group>
                  <Avatar
                    radius="xl"
                    src={`https://avatars.dicebear.com/api/jdenticon/${userProfile?.id}.svg?background=%230000ff`}
                  />
                  <div>
                    <Text size="sm" color="dimmed">
                      {userProfile?.username}
                    </Text>
                    <Text>{userProfile?.question}</Text>
                  </div>
                </Group>
              </Card.Section>
              <Card.Section inheritPadding py="md">
                <Textarea
                  autosize
                  minRows={2}
                  placeholder="What's on your mind?"
                  {...form.getInputProps("answer")}
                  rightSection={
                    <ActionIcon
                      title="Generate a random question"
                      onClick={() => {
                        const answer = randomAnswer();
                        form.setFieldValue("answer", answer);
                      }}
                    >
                      <Dice3 />
                    </ActionIcon>
                  }
                />
              </Card.Section>
            </Card>
          </Skeleton>
          <Skeleton visible={!userProfile} my="md">
            <Button
              type="submit"
              loading={isSubmittingAnswer}
              color="teal"
              fullWidth
            >
              Send
            </Button>
            <Text my="md" align="center" size="sm" color="dimmed">
              {"100% anonymous q&a"}
            </Text>
          </Skeleton>
        </form>
      </Container>
    </React.Fragment>
  );
};
