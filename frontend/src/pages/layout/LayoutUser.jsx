import { Outlet, useLocation } from "react-router-dom";
import UserSectionHeader from "../../components/header/HeaderUserSection";
import { createContext, useState } from "react";

export const SearchContext = createContext();

export default function UserLayout() {
  const pathName = useLocation().pathname;
  
  const [searchedTag, setSearchedTag] = useState('');

  const bgStyle = {
    "/me/notes": "bg-indigo-50 dark:bg-slate-800",
    "/me/notes/": "bg-indigo-50 dark:bg-slate-800",
    "/me": "bg-slate-50 dark:bg-slate-800",
    "/me/": "bg-slate-50 dark:bg-slate-800",
  };
  
  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>

      <header className={`col-span-12 row-start-0 row-end-1`}>
        <UserSectionHeader setSearchedTag={setSearchedTag} />
      </header>

      <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll ${bgStyle[pathName]}`}>
        <SearchContext.Provider value={{searchedTag}}>
          <Outlet />
        </SearchContext.Provider>
      </main>

    </div>
  );
}