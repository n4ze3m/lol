import { Card, createStyles, Center, Indicator, Text } from "@mantine/core";
import { message } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/router";
import { Heart } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 100ms ease",
    cursor: "pointer",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
    },
  },
}));

export function LolCard(data: message) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Indicator color="green" disabled={!data.opened} label={"✓"} size={19}>
      <Card
        onClick={() => router.push(`/me/a/${data.id}`)}
        shadow="sm"
        p="lg"
        className={classes.card}
      >
        <Center>
          <Heart />
        </Center>

        <Text size="xs" color="dimmed" mt="md" align="center">
          {
            moment(data.created_at).fromNow()
          }
        </Text>
      </Card>
    </Indicator>
  );
}
