import {
  AppShell,
  Group,
  Header,
  Text,
  createStyles,
  Container,
  Indicator,
  Button,
} from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";

const HEADER_HEIGHT = 65;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
  curosrPointer: {
    cursor: "pointer",
  },
}));

type Props = {
  children: React.ReactNode;
};

function LandingLayout({ children }: Props) {
  const { classes } = useStyles();
  const router = useRouter();
  const { user } = useUser();
  const notRedirected = "/u/[username]";
  React.useEffect(() => {
    if (user) {
      if (router.pathname !== notRedirected) {
        router.push("/me");
      }
    }
  }, [user]);
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
          <Container className={classes.inner} fluid>
            <Group>
              <Indicator inline label="alpha" offset={-4} size={12}>
                <Text
                  className={classes.curosrPointer}
                  onClick={() => router.push("/")}
                  weight="bold"
                  size="lg"
                >
                  Lol Message
                </Text>
              </Indicator>
            </Group>
            <Button
              onClick={() => router.push("/login")}
              color="teal"
              radius="xl"
              sx={{ height: 30 }}
            >
              Login
            </Button>
          </Container>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default LandingLayout;
