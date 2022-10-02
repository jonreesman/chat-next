import { useEffect, useState, useContext } from "react";
import peakchat from "../api/api";
import { Room } from "../types/room";
import { userContext } from "./userContext";

export default (): [Room[], boolean, boolean, () => void] => {
  const user = useContext(userContext);
  const [rooms, setRooms] = useState<Room[]>();
  const [fetched, setFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getRooms = () => {
    peakchat.get(`/api/rooms`, {})
    .then(response => {
      setRooms(response.data);
      setLoading(false);
      setFetched(true);
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getRooms()
  },[])


  return [rooms, loading, fetched, getRooms];
};
