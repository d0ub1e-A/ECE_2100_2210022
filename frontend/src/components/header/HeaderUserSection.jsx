import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../layout/LayoutUser";
import { User2, Sun, Moon, CircleX } from "lucide-react";
import { GlobalContext } from "../../App";

export default function UserSectionHeader({ setSearchedTag, searchedTag }) {
  const navTo = useNavigate();
  const { userInfo, userNotes } = useContext(UserContext);
  const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);
  const searchRef = useRef(null);
  const currentPath = useLocation().pathname;

  const [tagArray, setTagArray] = useState([]);
  const [showTagMenu, setShowTagMenu] = useState(false);

  const inProfilePage = /\/me\/?$/.test(currentPath);

  useEffect(() => searchRef.current?.reset(), [currentPath]);

  useEffect(() => setTagArray(userNotes.map(notes => notes.tag)), [userNotes]);

  return (
    <div className={`flex relative z-60 justify-between items-center px-4 py-4 md:py-2 bg-gradient-to-r from-purple-mid/30 to-purple-600`}>

      {/* Logo and name section */}
      <Link to={`/me/notes`}>
        <img
          className={`w-[5rem] h-[5rem]`}
          src="/LogoQuickNotes.png"
        />
      </Link>

      {/* Search bar and profile section */}
      {!inProfilePage &&
        <form ref={searchRef}>
          <input
            type="text"
            name="searchTag"
            placeholder="Search By tag"
            value={searchedTag}
            onChange={e => setSearchedTag(e.target.value)}
            onFocus={() => setShowTagMenu(true)}
            onBlur={() => setTimeout(() => setShowTagMenu(false), 250)}
            className={`px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 focus:border-white/60 rounded-[15px] outline-none text-white placeholder:text-white/70 transition-colors w-[20rem]`}
          />

          {/* tag menu */}
          <div className={`absolute w-[20rem] -bottom-[11.5rem] rounded-[15px] flex flex-col transition-all ${showTagMenu && tagArray.length > 0 ? 'max-h-[20rem] z-50 py-[1.2rem] tag-menu' : 'max-h-0 z-0 border-0'} overflow-y-auto bg-[whitesmoke] dark:bg-grey-bold dark:text-[whitesmoke]`}>
            {tagArray.map((tag, i) =>
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSearchedTag(tag);
                  setShowTagMenu(false);
                }}
                className={`px-5 py-2 hover:bg-grey-mid hover:text-[whitesmoke] transition-all fira-mono`}
              >{tag}</button>
            )}
          </div>
        </form>
      }

      {/* Profile section */}
      <div className={`flex gap-5 items-center`}>
        {/* <button
          onClick={toggleTheme}
          className={`p-3 rounded-full bg-grey-mid/50 backdrop-blur-lg hover:scale-110 transition-all`}
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ?
            <Sun className="w-5 h-5 text-white" /> :
            <Moon className="w-5 h-5 text-white" />
          }
        </button> */}

        <div className={`bg-grey-mid/50 backdrop-blur-lg p-4 rounded-[50%]`}><User2 className={`text-white`} /></div>
        <button
          onClick={() => navTo('/me')}
          title="Go to profile"
          className={`flex items-center justify-center text-white text-xl hover:scale-110 transition-all`}
        >{userInfo.name}</button>
      </div>

    </div>
  );
}