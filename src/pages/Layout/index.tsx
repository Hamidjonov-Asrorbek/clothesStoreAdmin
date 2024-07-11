import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
