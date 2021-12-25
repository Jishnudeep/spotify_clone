import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { SwitchHorizontalIcon } from "@heroicons/react/outline";

const Player = () => {
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(isPlayingState);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing:", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyAPI.getAccessToken() && !currentTrackId) {
      //fetch song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyAPI, session]);

  return (
    <div
      className="grid grid-cols-3 text-xs md:text-base px-2 md:px-8 h-24 bg-gradient-to-b 
    from-black to-gray-900 text-white"
    >
      {/*Left Side Song Info*/}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt="song-image"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/*Center Section */}
      <div>
        <SwitchHorizontalIcon className="button" />
      </div>
    </div>
  );
};

export default Player;
