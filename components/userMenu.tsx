import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  Menu,
  Text,
  Modal,
  Avatar,
  FileButton,
  Button,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { useEventListener } from "@mantine/hooks";

import { userContext } from "../hooks/userContext";
import {
  IconLogout,
  IconUserCircle,
  IconUpload,
  IconUser,
} from "@tabler/icons";
import FileUpload from "../api/user/fileUpload";
import peakchat from "../api/api";
import Logout from "../api/auth/logout";
import UpdateDisplayName from "../api/user/updateUserDisplayName";

const UserMenu = () => {
  const {user, setUser} = useContext(userContext);
  const [avatarChangeOpened, setAvatarChangeOpened] = useState(false);
  const [nameChangeOpened, setNameChangeOpened] = useState(false);

  const [newName, setNewName] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const updateName = async () => {
    UpdateDisplayName(user.ID, newName).then((response) => {
      let newUser = response;
      console.log(response)
      if (newUser === null) {
        return
      }
      newUser.AvatarURL = user.AvatarURL
      setUser(newUser);
      setNewName("");
      setNameChangeOpened(false);
    });
  };

  const isAlphaNumeric = (str: string) => {
    str = str.replace(/(\r\n|\n|\r)/gm, "");
    return /^[a-z0-9]+$/gi.test(str);
  };

  const ENTER = 13;
  const submit = useCallback((e) => {
    if (e.keyCode === ENTER && isAlphaNumeric(newName)) {
      updateName();
    }
  }, []);

  const textAreaEnter = useEventListener("keydown", submit);

  useEffect(() => {
    if (file != null) {
      setImage(window.URL.createObjectURL(file));
    }
  }, [file, setFile]);

  console.log(peakchat.getUri() + "/avatars/" + user.AvatarURL);
  return (
    <Menu shadow="md" width={200} trigger="hover">
      <Modal
        size="xs"
        opened={avatarChangeOpened}
        onClose={() => {
          return setAvatarChangeOpened(false);
        }}
      >
        <Group position="apart">
          <Avatar
            src={
              image
                ? image
                : peakchat +
                  "/avatars/" +
                  user.AvatarURL
            }
            size="xl"
          />
          <Stack>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => {
                return (
                  <Button {...props}>
                    <IconUpload size={14} />
                  </Button>
                );
              }}
            </FileButton>
            <Button
              onClick={async () => {
                const response = FileUpload(file, user.ID);
                await response.then((res) => {
                  let newUser = res;
                  setUser(newUser);
                  setAvatarChangeOpened(false);
                });
              }}
            >
              Submit
            </Button>
          </Stack>
        </Group>
      </Modal>
      <Modal
        size="xs"
        opened={nameChangeOpened}
        onClose={() => {
          return setNameChangeOpened(false);
        }}
      >
        <Group position="apart">
          <Stack>
            <TextInput
              ref={textAreaEnter}
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <Button
              onClick={async () => {
                UpdateDisplayName(user.ID, newName).then((response) => {
                  let newUser = response;
                  newUser.AvatarURL = user.AvatarURL
                  setUser(newUser);
                  setNameChangeOpened(false);
                });
              }}
            >
              Submit
            </Button>
          </Stack>
        </Group>
      </Modal>

      <Menu.Target>
        <Group>
          <Text>{user.DisplayName}</Text>
          <Avatar
            src={
              peakchat.getUri() + "/avatars/" + user.AvatarURL
            }
          />
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconUser size={14} />}
          onClick={() => {
            return setNameChangeOpened(true);
          }}
        >
          Change Display Name
        </Menu.Item>
        <Menu.Item
          icon={<IconUserCircle size={14} />}
          onClick={() => {
            return setAvatarChangeOpened(true);
          }}
        >
          Change Avatar
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size={14} />}
          onClick={() => {
            Logout(setUser).then(() => {
              console.log("Logging out")
            })
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
