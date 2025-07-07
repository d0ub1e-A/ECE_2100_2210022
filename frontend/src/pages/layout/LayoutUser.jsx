import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { api } from "../../assets/util/UtilApi";
import { arrangeNotes, getPinnedNotes } from "../../assets/util/UtilArrangeNotes";

import UserSectionHeader from "../../components/header/HeaderUserSection";

export const UserContext = createContext();

export default function UserLayout() {
  const pathName = useLocation().pathname;
  const navTo = useNavigate();

  const [searchedTag, setSearchedTag] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const [userPinnedNotes, setUserPinnedNotes] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const bgStyle = {
    "/me/notes": "bg-indigo-50 dark:bg-slate-800",
    "/me/notes/": "bg-indigo-50 dark:bg-slate-800",
    "/me": "bg-[hsl(264,0%,100%)] dark:bg-[hsl(264,0%,10%)]",
    "/me/": "bg-slate-50 dark:bg-slate-800",
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userProfileRes = await api.get('/user');
        const userNotesRes = await api.get('/notes');

        setUserInfo(userProfileRes.data);
        setUserNotes(arrangeNotes(userNotesRes.data));
        setUserPinnedNotes(getPinnedNotes(userNotesRes.data));
      } catch (error) {
        error.status === 401 && navTo('/login');
        console.error(error);
      }
    }

    fetchUserData();
  }, [refetch]);

  useEffect(() => setSearchedTag(''), [pathName]);

  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>

      <UserContext.Provider value={{ searchedTag, userInfo, userNotes, setRefetch, userPinnedNotes }}>
        <header className={`col-span-12 row-start-0 row-end-1 user-header`}>
          <UserSectionHeader setSearchedTag={setSearchedTag} />
        </header>

        <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll ${bgStyle[pathName]}`}>
          <Outlet />
        </main>
      </UserContext.Provider>

    </div>
  );
}