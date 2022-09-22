import {
  AppShell,
  Box,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  Container,
  Divider,
  Menu,
  Avatar,
  Indicator,
  ActionIcon,
} from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import React from "react";
import {
  Archive,
  Settings,
  ChevronDown,
  Logout,
  Link,
  Home,
  Search,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tabControl: {
    fontWeight: 500,
    height: 38,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  tabControlActive: {
    borderColor: `${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    } !important`,
  },
}));

type Props = {
  children: React.ReactNode;
};

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

function MainLink({ icon, color, label, path }: MainLinkProps) {
  const router = useRouter();
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        backgroundColor:
          router.pathname === path
            ? theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
            : undefined,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={() => router.push(path)}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
const data = [
  { icon: <Home size={16} />, color: "blue", label: "Home", path: "/home" },
  { icon: <Link size={16} />, color: "teal", label: "Links", path: "/links" },
  {
    icon: <Archive size={16} />,
    color: "red",
    label: "Archives",
    path: "/archives",
  },
  {
    icon: <Settings size={16} />,
    color: "orange",
    label: "Settings",
    path: "/settings",
  },
];
function DashboardLayout({ children }: Props) {
  const [email, setEmail] = React.useState("...");
  const {user } = useUser()
  const [avatar, setAvatar] = React.useState(
    "https://avatars.dicebear.com/api/jdenticon/xdsds-sdsdsds-dsdsds.svg?background=%230000ff"
  );
  React.useEffect(() => {
    setAvatar(
      `https://avatars.dicebear.com/api/jdenticon/${user?.id}.svg?background=%230000ff`
    );
    setEmail(user?.email || "...");
  }, [user]);
  const router = useRouter();
  const [opened, setOpened] = React.useState(false);
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = React.useState(false);

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
        <Header height={70} p="md">
          <Container className={classes.mainSection}>
            <Group position="apart">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    mr="xl"
                  />
                </MediaQuery>
                <Indicator inline label="alpha" offset={-4} size={12}>
                  <Text size="lg" onClick={() => router.push("/me")}>
                    Lol Message
                  </Text>
                </Indicator>
              </div>
              <Group position="right">
                <Menu
                  width={260}
                  position="bottom-end"
                  transition="pop-top-right"
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                >
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group spacing={7}>
                        <Avatar src={avatar} radius="xl" size={30} />
                        <MediaQuery
                          smallerThan={"sm"}
                          styles={{ display: "none" }}
                        >
                          <span>{email}</span>
                        </MediaQuery>
                        <ChevronDown size={12} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<Settings size={14} />}>
                      Settings
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      color="red"
                      icon={<Logout size={14} />}
                      onClick={async () => {
                        await supabaseClient.auth.signOut();
                        router.push("/login");
                      }}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Container>
        </Header>
      }
    >
      <Container>{children}</Container>
    </AppShell>
  );
}

export default DashboardLayout;
