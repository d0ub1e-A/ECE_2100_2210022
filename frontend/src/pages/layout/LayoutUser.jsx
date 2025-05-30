import { Outlet } from "react-router-dom";
import UserSectionHeader from "../../components/header/HeaderUserSection";

export default function UserLayout() {
  return (
    <div className={`fixed grid grid-cols-12 grid-rows-12`}>

      <header className={``}>
        <UserSectionHeader />
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}