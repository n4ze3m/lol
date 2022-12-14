import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { BrandGithub } from "tabler-icons-react";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: 80,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function LandingHero() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          Get Anonymous{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "teal", to: "green" }}
            inherit
          >
            Message, Feedback and Advice
          </Text>{" "}
          from your peers.
        </h1>

        <Text className={classes.description} color="dimmed">
          Open source anonymous feedback and advice platform for anyone lol.
        </Text>
        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            color="teal"
            onClick={() => router.push("/login")}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/n4ze3m/lol"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<BrandGithub />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
