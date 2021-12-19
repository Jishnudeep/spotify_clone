import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const Songs = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyAPI = useSpotify();
  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyAPI, playlistId]);

  console.log(playlist);
  return (
    <div className="text-white">
      {playlist?.tracks?.items?.map((items) => (
        <p key={items.track.id}>{items.track.name}</p>
      ))}
    </div>
  );
};

export default Songs;
