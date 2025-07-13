import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../pages/layout/LayoutUser";
import { User2 } from "lucide-react";

export default function UserSectionHeader({ setSearchedTag }) {
  const navTo = useNavigate();
  const { userInfo } = useContext(UserContext);
  const searchRef = useRef(null);
  const currentPath = useLocation().pathname;

  const inProfilePage = /\/me\/?$/.test(currentPath);

  useEffect(() => searchRef.current?.reset(), [currentPath]);

  return (
    <div className={`flex relative z-60 justify-between items-center px-4 py-4 md:py-2 bg-gradient-to-r from-purple-mid to-purple-600`}>

      {/* Logo and name section */}
      <Link
        to={`/me/notes`}>
        <div className={`bg-gradient-to-tr from-grey-lite to-purple-lite bg-clip-text`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-transparent font-bold patrick-hand">Your Quick Notes</h1>
        </div>
      </Link>

      {/* Search bar and profile section */}
      {!inProfilePage &&
        <form ref={searchRef}>
          <input
            type="text"
            name="searchTag"
            placeholder="Search By tag"
            onChange={e => setSearchedTag(e.target.value)}
            className={`px-5 py-2 bg-grey-lite/50 focus:border border-grey-mid/80 rounded-[15px] outline-none`}
          />
        </form>
      }
      <div className={`flex gap-5 items-center`}>
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