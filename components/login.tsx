import React, { useState } from 'react'
import { TextInput, PasswordInput, Button, Space, Container, Center } from '@mantine/core';
import tryLogin from "../api/auth/login";
import { AxiosResponse } from "axios";
import { User } from '../types/user';


type Props = {
    setUser: React.Dispatch<React.SetStateAction<User>>
  };

const LoginPage: React.FC<Props> = ({ setUser })  => {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const attemptLogin = async () => {
    await tryLogin(username, password)
      .then((response: AxiosResponse) => {
        if (response === null || response == undefined) {
          return;
        }
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          console.log("Handle invalid login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
    return (
        <div style={{height: "100vh", width: "100%"}}>
        <Container size={400} style={{marginTop: "auto",  boxShadow: "0px 0px 5px 0px #000000", borderRadius: "2%"}}>
        <h1>Login</h1>
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
      <Space h={50} />
    </Container>
    </div>
  )
}


export default LoginPage