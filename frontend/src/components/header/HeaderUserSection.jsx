import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../pages/layout/LayoutUser";

import UIQuickNotesLogo from "../ui/UIQuickNotesLogo.png";

export default function UserSectionHeader({ setSearchedTag }) {
  const navTo = useNavigate();
  const { userInfo } = useContext(UserContext);
  const searchRef = useRef(null);
  const currentPath = useLocation().pathname;

  const inProfilePage = /\/me\/?$/.test(currentPath);

  useEffect(() => searchRef.current?.reset(), [currentPath]);

  return (
    <div className={`flex justify-between items-center px-4 md:px-8 py-4 md:py-2 bg-gradient-to-r from-purple-mid to-purple-600`}>

      {/* Logo and name section */}
      <div className="flex gap-3 items-center">
        <img
          src={UIQuickNotesLogo}
          alt="Quick Notes Logo"
          className="w-10 md:w-16 drop-shadow-lg"
        />
        <Link to={`/me/notes`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-amber-100 font-bold patrick-hand">Your Quick Notes</h1>
        </Link>
      </div>

      {/* Search bar and profile section */}
      <div className={`flex gap-5 items-center`}>
        {!inProfilePage &&
          <form ref={searchRef}>
            <input
              type="text"
              name="searchTag"
              placeholder="🔎 Search By Tag"
              defaultValue={inProfilePage ? '' : ''}
              onChange={e => setSearchedTag(e.target.value)}
              className={`px-1 py-1.5 bg-slate-200 rounded-xl outline-none`}
            />
          </form>
        }

        <button
          onClick={() => navTo('/me')}
          title="Go to profile"
          className={`flex items-center justify-center text-white text-xl hover:scale-110 transition-all`}
        >{userInfo.name}</button>
      </div>

    </div>
  );
}