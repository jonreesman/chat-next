import React, { useState, useEffect } from "react";
import { Skeleton } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';


const RoomSkeleton = () => {
  const { height } = useViewportSize();
  const [skeletonNumber, setSkeletonNumber] = useState(10);

  useEffect(() => {
    setSkeletonNumber(Math.floor(height / 60) - 1)
  }, [height])

  return (
    <>
      {[...Array(skeletonNumber)].map((_x, i) => {
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
