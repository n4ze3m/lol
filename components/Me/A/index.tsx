import { Button, Card, Container, Skeleton, Text } from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "utils/trpc";
import { toBlob, toPng } from "html-to-image";
export const ABody = () => {
  const { user } = useUser();

  const router = useRouter();

  const ref = React.useRef<HTMLDivElement>(null);
  const { data: message } = trpc.useQuery(
    [
      "questionAnswer",
      {
        questionId: `${router.query.id}`,
        userId: user?.id,
      },
    ],
    {
      enabled: Boolean(router.query.id && user?.id),
    }
  );

  const onReply = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    toBlob(ref.current, { cacheBust: true }).then((blob) => {
      // share image to whatsapp, facebook, twitter and instagram using native share api
      if (blob && navigator.share) {
        navigator.share({
          title: "Lol",
          files: [new File([blob], "lol.png", { type: "image/png" })],
        });
      }
    });
  }, [ref]);

  return (
    <React.Fragment>
      <Container size={500} mt={80}>
        <Skeleton visible={!message}>
          <div ref={ref}>
            <Card withBorder shadow="sm" radius="md">
              <Card.Section withBorder inheritPadding py="md">
                <Text align="center">{message?.question}</Text>
              </Card.Section>
              <Card.Section inheritPadding py="md">
                <Text align="center">{message?.message}</Text>
              </Card.Section>
            </Card>
          </div>
        </Skeleton>
        <Skeleton visible={!message} my="md">
          <Button color="teal" fullWidth onClick={onReply}>
            Reply
          </Button>
        </Skeleton>
      </Container>
    </React.Fragment>
  );
};
