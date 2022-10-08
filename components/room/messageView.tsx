import React, { useState, useEffect, useRef } from "react";
import { useMantineTheme } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons";
import {
  ScrollArea,
  Divider,
  Card,
  Text,
  Stack,
  Affix,
  Transition,
  Button,
  Container,
  Avatar,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useInViewport } from "react-in-viewport";
import RoomSkeleton from "../roomSkeleton";
import { User } from '../../types/user';
import { Room } from '../../types/room';
import peakchat from '../../api/api';

type Props = {
  lastMessage: MessageEvent<any>,
   user: User,
   room: Room,
}

const MessageView: React.FC<Props> = ({ room, lastMessage, user }) => {
  const [roomHistory, setRoomHistory] = useState([]);
  const theme = useMantineTheme();

  const bottomRef = useRef(null);
  const [, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const isAtBottom = useInViewport(bottomRef);
  const viewport = useRef(null);
  const { height } = useViewportSize();

  useEffect(() => {
    setRoomHistory([]);
  }, [room]);

  useEffect(() => {
    if (lastMessage != null) {
      let jsonMessage = JSON.parse(lastMessage.data);
      setRoomHistory((prev) => {
        return prev.concat(jsonMessage);
      });
    }
  }, [lastMessage, setRoomHistory]);

  const scrollToBottom = () => {
    if (viewport === undefined) {
      return;
    }
    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return roomHistory ? (
    <Container style={{ display: "flex", position: "relative", width: "100%", height: "70vh" }}>
      <ScrollArea.Autosize
        style={{ flex: 10, height: "70vh" }}
        maxHeight={height - 200}
        viewportRef={viewport}
        onScrollPositionChange={onScrollPositionChange}
      >
        {roomHistory.map((message, idx) => {
          return (
            <Card
              key={idx}
              shadow="sm"
              p="lg"
              radius="md"
              style={{ marginTop: 5, whiteSpace: "pre-wrap" }}
              withBorder
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                }}
              >
                <Avatar
                  src={
                    peakchat.getUri() +
                    "/avatars/" +
                    message.User.AvatarURL
                  }
                  size="md"
                  style={{ float: "left", marginRight: "10px" }}
                />
                <Stack>
                  <Text size="sm" color={(theme.colorScheme === "dark" 
                  ? theme.colors.dark[0]
                  : "teal")}>
                    {message ? message.User.DisplayName : null}
                  </Text>
                  <Text>{message.Content}</Text>
                </Stack>
              </div>
            </Card>
          );
        })}
        <Divider my="xs" ref={bottomRef} />
      </ScrollArea.Autosize>
      <Affix position={{ bottom: "20vh", right: 90 }}>
        <Transition transition="slide-down" mounted={!isAtBottom.inViewport}>
          {(transitionStyles) => {
            return (
              <Button
                leftIcon={<IconArrowDown size={16} />}
                style={transitionStyles}
                color={theme.colorScheme === "dark" 
                  ? "gray"
                  : "blue"}
                onClick={() => {
                  return scrollToBottom();
                }}
              >
                Scroll to bottom {isAtBottom.inViewport}
              </Button>
            );
          }}
        </Transition>
      </Affix>
    </Container>
  ) : (
    <RoomSkeleton />
  );
};

export default MessageView;
