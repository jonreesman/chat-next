import React, { useContext, useState } from "react";
import {
  Header,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
  Group,
  Button,
} from "@mantine/core";
import { userContext } from "../hooks/userContext";
import UserMenu from "./userMenu";

type Props = {
  navOpened: boolean,
  setNavOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

const CustomHeader: React.FC<Props> = ({ navOpened, setNavOpened, setDrawerOpened }) => {
  const theme = useMantineTheme();
  const user = useContext(userContext).user;
  return (
    <Header height={70} p="md">
      <Group style={{ float: "left" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={navOpened}
            onClick={() => setNavOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text>Chat</Text>
      </Group>

      <Group style={{ float: "right" }}>
        {user ? (
          <UserMenu />
        ) : (
          <Button onClick={() => setDrawerOpened(true)}>Login</Button>
        )}
      </Group>
    </Header>
  );
};

export default CustomHeader;
