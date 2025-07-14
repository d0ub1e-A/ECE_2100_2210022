import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../assets/util/UtilApi";
import { arrangeNotes, getPinnedNotes, getUntaggedNotes } from "../../assets/util/UtilArrangeNotes";
import { GlobalContext } from "../../App";

import UserSectionHeader from "../../components/header/HeaderUserSection";

export const UserContext = createContext();

export default function UserLayout() {
  const pathName = useLocation().pathname;
  const navTo = useNavigate();
  const { notifyUser } = useContext(GlobalContext);

  const [searchedTag, setSearchedTag] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const [userPinnedNotes, setUserPinnedNotes] = useState([]);
  const [untaggedNotes, setUntaggedNotes] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const bgStyle = {
    "/me/notes": "bg-indigo-50 dark:bg-slate-800",
    "/me/notes/": "bg-indigo-50 dark:bg-slate-800",
    "/me": "bg-[hsl(264,0%,100%)] dark:bg-[hsl(264,0%,10%)]",
    "/me/": "bg-slate-50 dark:bg-slate-800",
  };

  document.title = 'Quick Notes';

  // Fetch the user info and notes info
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userProfileRes = await api.get('/user');
        const userNotesRes = await api.get('/notes');

        setUserInfo(userProfileRes.data);
        setUserNotes(arrangeNotes(userNotesRes.data));
        setUserPinnedNotes(getPinnedNotes(userNotesRes.data));
        setUntaggedNotes(getUntaggedNotes(userNotesRes.data));
      } catch (error) {
        console.error(error);

        if (error.status === 401) {
          navTo('/login');
          notifyUser('error', 'Login into your account to see your notes');
        }
        if (error.status === 500) notifyUser('error', 'Internal server error. Please try again!');
      }
    }

    fetchUserData();
  }, [refetch]);

  useEffect(() => setSearchedTag(''), [pathName]);

  return (
    <UserContext.Provider value={{ searchedTag, userInfo, userNotes, setRefetch, userPinnedNotes, untaggedNotes }}>
      <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>
        <header className={`col-span-12 row-start-0 row-end-1 user-header`}>
          <UserSectionHeader 
          searchedTag={searchedTag}
          setSearchedTag={setSearchedTag} 
          />
        </header>

        <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll ${bgStyle[pathName]}`}>
          <Outlet />
        </main>
      </div>
    </UserContext.Provider>
  );
}