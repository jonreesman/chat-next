import { useMantineTheme } from "@mantine/core";
import { IconArrowUp, IconUpload } from "@tabler/icons";
import React, { useState, useEffect, useCallback } from "react";
import { Textarea, Stack, Button, Container, FileButton, Group } from "@mantine/core";
import { useEventListener } from "@mantine/hooks";
import { SendMessage } from "react-use-websocket"

type Props = {
  sendMessage: SendMessage,
}

const ChatInput: React.FC<Props> = ({ sendMessage }) => {
  const theme = useMantineTheme();
  const [messageValue, setMessageValue] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file != null) {
      sendMessage(file);
    }
  }, [file, setFile]);

  const submit = useCallback((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(messageValue);
      setMessageValue("");
    }
  },[messageValue]);
  const textAreaEnter = useEventListener("keydown", submit);

  return (
    <Container style={{ width: "100%", height: "15vh" }}>
      <Group>

      <Textarea
        placeholder="Your comment"
        radius="lg"
        size="md"
        required
        autosize
        maxLength={2000}
        maxRows={3}
        minRows={2}
        ref={textAreaEnter}
        value={messageValue}
        onSubmit={() => sendMessage(messageValue)}
        onChange={(event) => {
          if (event.currentTarget.value == "\n") {
            return;
          }
          setMessageValue(event.currentTarget.value);
        }}
        style={{ width: "90%", height: "100%", flex: 9, marginTop: "auto", marginBottom: "auto" }}
        />
        <Stack>

        <Button
          radius="xl"
          leftIcon={<IconArrowUp size={14} />}
          color={theme.colorScheme === "dark" 
              ? "gray"
              : "blue"}
          style={{
            marginLeft: "10px",
            marginTop: "auto",
          }}
          onClick={() => {
            sendMessage(messageValue);
            setMessageValue("");
          }}
          />
          </Stack>
          </Group>
    </Container>
  );
};

export default ChatInput;
