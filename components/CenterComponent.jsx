/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const colors = [
  "from-indigo-500",
  "from-red-500",
  "from-blue-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-green-500",
];

const CenterComponent = () => {
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyAPI, playlistId]);

  // console.log(playlist);

  // console.log(session);
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center text-white
        bg-black space-x-3 opacity-90 hover:opacity-80 
        rounded-full p-1 pr-2"
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image || "https://links.papareact.com/9xl"}
            alt="user"
          />
          <h2 className="hover:text-white-600">
            {session?.user?.name || "User"}{" "}
          </h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 
        bg-gradient-to-b to-black  ${color} h-80 
        text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt="playlist-image"
          className="h-44 w-44 shadow-2xl"
        />
      </section>
    </div>
  );
};

export default CenterComponent;
