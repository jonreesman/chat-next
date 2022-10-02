import { IconArrowUp, IconUpload } from "@tabler/icons";
import React, { useState, useEffect, useCallback } from "react";
import { Textarea, Stack, Button, Container, FileButton } from "@mantine/core";
import { useEventListener } from "@mantine/hooks";
import { SendMessage } from "react-use-websocket"

type Props = {
  sendMessage: SendMessage,
}

const ChatInput: React.FC<Props> = ({ sendMessage }) => {
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
    <Container style={{ width: "100%", display: "flex", flex: 1 }}>
      <Textarea
        placeholder="Your comment"
        radius="lg"
        size="md"
        required
        autosize
        maxLength={2000}
        maxRows={2}
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
        style={{ alignSelf: "flex-end", width: "90%", height: "100%", flex: 9 }}
      />
      <Stack justify="flex-end" spacing="xs" style={{ marginLeft: "10px" }}>
        <FileButton
          onChange={setFile}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Button {...props}>
              <IconUpload size={14} />
            </Button>
          )}
        </FileButton>
        <Button
          radius="md"
          leftIcon={<IconArrowUp size={14} />}
          onClick={() => {
              sendMessage(messageValue);
              setMessageValue("");
          }}
        />
      </Stack>
    </Container>
  );
};

export default ChatInput;
