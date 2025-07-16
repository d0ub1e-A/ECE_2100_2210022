import { Outlet, useLocation } from "react-router-dom";
import { createContext, useState } from "react";

import PublicSectionHeader from "../components/header/HeaderPublicSection";

export const ScrollContext = createContext();

export default function PublicLayout() {
  const pathName = useLocation().pathname;

  const [homeSection, setHomeSection] = useState(null);
  const [contactsSection, setContactsSection] = useState(null);

  const bgStyle = {
    "/login": "dark:bg-slate-800",
  }

  return (
    <div className={`fixed w-screen h-screen grid grid-cols-12 grid-rows-12`}>

      <ScrollContext.Provider value={{homeSection, contactsSection, setHomeSection, setContactsSection}}>
        <header className={`col-span-12 row-start-0 row-end-1`}>
          <PublicSectionHeader />
        </header>

        <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll ${bgStyle[pathName]}`}>
          <Outlet />
        </main>
      </ScrollContext.Provider>

    </div>
  );
}