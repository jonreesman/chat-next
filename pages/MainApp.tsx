import React, { useEffect, useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import CustomNavbar from "../components/navbar";
import CustomHeader from "../components/header";
import CustomAside from "../components/aside";
import CustomDrawer from "../components/drawer";
import RoomSkeleton from "../components/roomSkeleton";
import useRooms from "../hooks/useRooms";
import { userContext } from "../hooks/userContext";
import RoomView from "../components/room/room";
import ConnectToRoom from "../api/room/connectToRoom";
import loadUser from "../api/user/loadUser";
import { User } from '../types/user';
import { Room } from '../types/room'

const MainApp = () => {
  const theme = useMantineTheme();

  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [roomToken, setRoomToken] = useState("");
  const [rooms, loading, fetched] = useRooms();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [navOpened, setNavOpened] = useState(false);
  const [asideOpened, setAsideOpened] = useState(false);

  useEffect(() => {
    loadUser()
      .then((user) => {
        if (user != undefined) {
          setUser(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (rooms === undefined) {
      console.log("rooms undefined ", rooms)
      return
    }
    if (rooms[0] != undefined && user != undefined) {
      console.log("Setting to room: " + rooms[0].ID);
      setRoom(rooms[0]);
    }
  }, [rooms]);

  useEffect(() => {
    console.log("test");
    if (user != undefined) {
      ConnectToRoom(room, user)
        .then((token) => {
          setRoomToken(token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [room, roomToken]);

  return (
    <userContext.Provider value={{
                            user, setUser
                          }}>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          rooms && user != null ? (
            <CustomNavbar
              navOpened={navOpened}
              setRoom={setRoom}
              rooms={rooms}
              room={room}
              fetched={fetched}
              loading={loading}
            />
          ) : (
            <>
              <CustomNavbar
                fetched={false}
                loading={true}
                navOpened={navOpened}
                room={null}
                setRoom={null}
                rooms={null}
              />
            </>
          )
        }
        aside={
          <CustomAside
            asideOpened={asideOpened}
          />
        }
        header={
          <CustomHeader
            navOpened={navOpened}
            setNavOpened={setNavOpened}
            setDrawerOpened={setDrawerOpened}
          />
        }
      >
        <CustomDrawer
          drawerOpened={drawerOpened}
          setDrawerOpened={setDrawerOpened}
          setUser={setUser}
          onClose={() => setDrawerOpened(false)}
        ></CustomDrawer>
        {fetched && room && user && roomToken != undefined ? (
          <RoomView room={room} roomToken={roomToken} />
        ) : (
          <RoomSkeleton />
        )}
      </AppShell>
    </userContext.Provider>
  );
};

export default MainApp;
