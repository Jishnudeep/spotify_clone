import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Clone</title>
      </Head>

      <main>
        <Sidebar />
        {/* <CenterComponent/> */}
      </main>

      <div>{/* <Player/> */}</div>
    </div>
  );
}
