/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";

const CenterComponent = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-grow text-white">
      <header>
        <div className="">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image || "https://links.papareact.com/9xl"}
            alt="user"
          />
          <h2>{session?.user?.name}</h2>
        </div>
      </header>
    </div>
  );
};

export default CenterComponent;
