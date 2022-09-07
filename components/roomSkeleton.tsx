import React from "react";
import { Skeleton } from "@mantine/core";

const RoomSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((_x, i) => {
        return (
          <Skeleton
            width="100%"
            key={i}
            height={60}
            radius="md"
            style={{ marginTop: 5, whiteSpace: "pre-wrap" }}
          />
        );
      })}
    </>
  );
};

export default RoomSkeleton;
