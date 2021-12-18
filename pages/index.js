import CenterComponent from "../components/CenterComponent";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <CenterComponent />
      </main>

      <div>{/* <Player/> */}</div>
    </div>
  );
}
