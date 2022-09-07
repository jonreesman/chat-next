import React from "react";
import { MediaQuery, Aside, Text } from "@mantine/core";

const CustomAside = ({ asideOpened }) => {
  if (!asideOpened) {
    return <div id="asideNotOpened" />;
  }

  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Aside
        p="md"
        hiddenBreakpoint="sm"
        hidden={!asideOpened}
        width={{ sm: 200, lg: 300 }}
      >
        <Text>Application sidebar</Text>
      </Aside>
    </MediaQuery>
  );
};

export default CustomAside;
