import React, { useState } from "react";
import { Button, Drawer, PasswordInput, TextInput, Space } from "@mantine/core";
import tryLogin from "../api/auth/login";
import { Axios, AxiosResponse } from "axios";
import { User } from '../types/user';

type Props = {
  onClose: () => void,
  drawerOpened: boolean,
  setDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User>>
};

const CustomDrawer: React.FC<Props> = ({ onClose, drawerOpened, setDrawerOpened, setUser }) => {
  const [username, setUsername] = useState("Guest");
  const [password, setPassword] = useState("Password");

  const attemptLogin = async () => {
    await tryLogin(username, password)
      .then((response: AxiosResponse) => {
        if (response === null || response == undefined) {
          return;
        }
        if (response.status === 200) {
          setUser(response.data.user);
          setDrawerOpened(false);
        } else {
          console.log("Handle invalid login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Drawer
      opened={drawerOpened}
      onClose={onClose}
      title="Register"
      padding="xl"
      size="xl"
    >
      <TextInput
        placeholder="Username"
        label="Username"
        value={username}
        onSubmit={attemptLogin}
        onChange={(event) => {
          setUsername(event.currentTarget.value);
        }}
        required
      />
      <Space h="lg" />
      <PasswordInput
        placeholder="Password"
        label="Password"
        value={password}
        onSubmit={attemptLogin}
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
        required
      />
      <Space h="lg" />
      <Button style={{ float: "right" }} onClick={attemptLogin}>
        Login
      </Button>
    </Drawer>
  );
};

export default CustomDrawer;
