import React from "react";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { showNotification } from "@mantine/notifications";


type LoginProps = {
  email: string;
};

export default function LoginBody() {
  const onLogin = async (values: LoginProps) => {
    await supabaseClient.auth.signIn({ email: values.email });
  };

  const { mutate: login, isLoading } = useMutation(onLogin, {
    onSuccess: () => {
        showNotification({
          message: "Check your email to verify your account",
          color: "green",
          title: "Success",
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
      email: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  return (
    <Container size={420} my={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Ready to get started?
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Sign in with your email address
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(async (values) => login(values))}>
          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="you@example.com"
            required
          />

          <Button
            loading={isLoading}
            type="submit"
            color="teal"
            fullWidth
            mt="xl"
            size="md"
          >
            Send magic link
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
