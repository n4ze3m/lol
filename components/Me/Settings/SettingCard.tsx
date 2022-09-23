import { Card, Group, Switch, Text } from "@mantine/core";
import React from "react";

interface Props {
  label: string;
  name: string;
  value: boolean;
  type: string;
  onChange: (value: boolean, name: string) => void;
}

export const SettingCard = ({ label, name, value, type, onChange }: Props) => {
  return (
    <Card my="md">
      <Card.Section inheritPadding py="md">
        <Group position="apart">
          <Text size="md" color="dimmed">
            {label}
          </Text>
          <Switch
            onChange={(e) => onChange(e.target.checked, name)}
            checked={value}
            name={name}
            size="md"
          />
        </Group>
      </Card.Section>
    </Card>
  );
};
