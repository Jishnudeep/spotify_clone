import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";

const Songs = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks?.items?.map((items, index) => (
        // <<div key={items.track.id}>{items.track.name}</div>>
        <Song key={items.track.id} order={index} track={items} />
      ))}
    </div>
  );
};

export default Songs;
