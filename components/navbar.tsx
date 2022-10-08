import React, { useEffect, useState, useCallback } from "react";
import {
  Navbar,
  Text,
  Card,
  ScrollArea,
  Skeleton,
  Menu,
  Group,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import RoomSkeleton from "./roomSkeleton";
import { useEventListener } from "@mantine/hooks";
import { IconDots, IconPlus, IconTrash } from "@tabler/icons";
import DeleteRoom from "../api/room/deleteRoom";
import AddRoom from "../api/room/addRoom";
import {Room} from '../types/room'

type Props = {
  navOpened: boolean,
  setRoom: React.Dispatch<React.SetStateAction<Room>> | null,
  room: Room | null,
  rooms: Room[] | null,
  fetched: boolean,
  loading: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
}

const CustomNavbar: React.FC<Props> = ({
  navOpened,
  setRoom,
  room,
  rooms,
  fetched,
  loading,
  setReload,
}) => {
  const theme = useMantineTheme();
  const [addRoomMenuOpened, setAddRoomMenuOpened] = useState<boolean>(false);
  const [newRoomName, setNewRoomName] = useState<string>("");
  const isAlphaNumeric = (str: string) => {
    str = str.replace(/(\r\n|\n|\r)/gm, "");
    return /^[a-z0-9]+$/gi.test(str);
  };

  const submit = useCallback((e: { keyCode: number; }) => {
    if (e.keyCode == 13 && isAlphaNumeric(newRoomName)) {
      AddRoom(newRoomName);
      setNewRoomName("");
      setAddRoomMenuOpened(false);
      window.location.reload();
    }
  },[]);
  const textAreaEnter = useEventListener("keydown", submit);

  useEffect(() => {
    if (fetched) {
      setRoom(rooms[0]);
    }
  }, [rooms, fetched]);

  if (!fetched && !loading) {
    return (
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        style={{ marginTop: 5, whiteSpace: "pre-wrap" }}
        withBorder
      >
        <Text>No rooms found</Text>
      </Card>
    );
  }

  if (loading || room === null) {
    return (
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!navOpened}
        width={{ sm: 200, lg: 300 }}
      >
        <RoomSkeleton />
      </Navbar>
    );
  }
  console.log(room)
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!navOpened}
      width={{ sm: 200, lg: 300 }}
    >
      <Modal
        opened={addRoomMenuOpened}
        onClose={() => {
          return setAddRoomMenuOpened(false);
        }}
        title="Add Room"
      >
        <TextInput
          ref={textAreaEnter}
          autoFocus
          value={newRoomName}
          onChange={(event) => {
            setNewRoomName(event.target.value);
          }}
        />
        <Button
          style={{ alignSelf: "flex-end", float: "right", marginTop: "5px" }}
          color={theme.colorScheme === "dark" 
              ? "gray"
              : "blue"}
          onClick={() => {
            AddRoom(newRoomName)
            .then((resp) => {
              setReload(true)
            })
            setAddRoomMenuOpened(false);
          }}
        >
          Add Room
        </Button>
      </Modal>
      <IconPlus
        style={{ alignSelf: "flex-end", marginBottom: "5px" }}
        size={16}
        onClick={() => {
          setAddRoomMenuOpened(true);
        }}
      />
      <ScrollArea.Autosize maxHeight={"75vh"} style={{ flex: 10, height: "75vh" }}>
        {rooms.map((value) => {
          let cardColor = "white";
          if (value.ID === room.ID) {
            cardColor = (theme.colorScheme === "dark" 
            ? theme.colors.dark[0]
            : "teal")
          }
          return (
            <Card
              key={value.ID}
              shadow="sm"
              p="lg"
              radius="md"
              style={{
                marginTop: 5,
                whiteSpace: "pre-wrap",
                cursor: "pointer",
              }}
              onClick={() => {
                setRoom(value);
              }}
              withBorder
            >
              <Group position="apart">
                <Text color={cardColor}>{value.Name}</Text>
                <Menu position="bottom" shadow="sm">
                  <Menu.Target>
                    <IconDots size={16} />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconTrash size={14} />}
                      onClick={() => {
                        DeleteRoom(value)
                        .then(()=> {
                          setReload(true)
                        })
                      }}
                    >
                      Delete Room
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card>
          );
        })}
      </ScrollArea.Autosize>
    </Navbar>
  );
};

export default CustomNavbar;
