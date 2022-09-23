import { Container } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useUser } from "@supabase/auth-helpers-react";
import { Loading } from "components/Common/Loading";
import React from "react";
import { trpc } from "utils/trpc";
import { SettingCard } from "./SettingCard";

export const SettingsBody = () => {
  const { user } = useUser();
  const { data: userSettings } = trpc.useQuery(
    [
      "userSettings",
      {
        userId: user?.id,
      },
    ],
    {
      enabled: Boolean(user?.id),
    }
  );
  const utils = trpc.useContext();

  const { mutateAsync: updateUserSettings } = trpc.useMutation(
    "updateUserSettings",
    {
      onSuccess: () => {
        utils.invalidateQueries(["userSettings", { userId: user?.id }]);
        showNotification({
          message: "Settings updated",
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
    }
  );
  if (!userSettings) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Container size={600}>
        {userSettings.settings.map((setting) => (
          <SettingCard
            {...setting}
            key={setting.name}
            onChange={async (value, name) => {
              await updateUserSettings({
                userId: user!.id,
                name,
                value,
              });
            }}
          />
        ))}
      </Container>
    </React.Fragment>
  );
};
