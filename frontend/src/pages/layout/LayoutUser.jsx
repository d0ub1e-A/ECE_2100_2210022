import { Outlet } from "react-router-dom";
import UserSectionHeader from "../../components/header/HeaderUserSection";

export default function UserLayout() {
  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>

      <header className={`col-span-12 row-start-0 row-end-1`}>
        <UserSectionHeader />
      </header>

      <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll`}>
        <Outlet />
      </main>

    </div>
  );
}