import { Outlet } from "react-router-dom";
import PublicSectionHeader from "../../components/header/HeaderPublicSection";

export default function PublicLayout() {
  return(
    <div className={`fixed grid grid-cols-12 grid-rows-12`}>
      
      <header className={``}>
        <PublicSectionHeader/>
      </header>

      <main>
        <Outlet/>
      </main>

    </div>
  );
}