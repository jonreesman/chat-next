import React from "react";
import { Skeleton } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';


const RoomSkeleton = () => {
  const { height } = useViewportSize();
  return (
    <>
      {[...Array(Math.floor(height / 60))].map((_x, i) => {
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
