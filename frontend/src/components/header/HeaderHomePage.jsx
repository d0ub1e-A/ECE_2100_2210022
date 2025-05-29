import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../App";

import MenuIcon from "../../assets/icon/IconMenu";

export default function HomePageHeader({ scrollTo }) {
  const { width } = useContext(GlobalState);
  const menuRef = useRef(null);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  // Handles menu closing on clicking outside the menu in mobile devices
  useEffect(() => {
    const toggelMenu = event =>
      (menuRef.current && !menuRef.current?.contains(event.target)) && setIsBurgerMenuOpen(false);
    document.title = `Quick Notes - Never Lose Your Ideas`;
    
    window.addEventListener('mousedown', toggelMenu);

    return () => window.removeEventListener('mousedown', toggelMenu);
  }, []);

  // Handles menu (opens only when in monile width) ops
  function updateSelectMenu(option) {
    const scrollSection = {
      Home: scrollTo.homeSection,
      Contacts: scrollTo.contactsSection,
    }

    setSelectedValue(option);
    document.title = option;
    scrollSection[option]?.current.scrollIntoView();
  }

  return (
    <div className={`flex justify-between items-center px-4 md:px-8 py-2 md:py-1 bg-indigo-600 shadow-xl`}>

      {/* Logo and name section */}
      <div className="flex gap-3 items-center w-full">
        <img
          src="src\components\ui\UIQuickNotesLogo.png"
          alt="Quick Notes Logo"
          className="w-15 md:w-25 drop-shadow-lg"
        />
        <Link to={`/`}>
          <h1
            onClick={() => width <= 768 ? updateSelectMenu('Home') : scrollTo.homeSection?.current.scrollIntoView()}
            className="text-2xl sm:text-4xl md:text-5xl text-[#83c6f3] font-bold font-[roboto]">Quick Notes</h1>
        </Link>
      </div>

      {/* Navigation bar */}
      <nav className={`w-full flex justify-end`}>

        {width <= 768 ?
          // Active in mobile width
          <div className="p-1.5 relative">

            {/* Menu Icon */}
            <div
              ref={menuRef}
              onClick={() => setIsBurgerMenuOpen(prevCondition => !prevCondition)}
              className="flex items-center justify-end gap-4 w-fit cursor-pointer"
            >
              <span className="font-bold font-[roboto] text-[#29a7a7] text-[20px]">{selectedValue}</span>
              <MenuIcon open={isBurgerMenuOpen}></MenuIcon>
            </div>

            {/* The menu */}
            <div className={`${isBurgerMenuOpen ? "max-h-60" : "max-h-0"} bg-slate-400 overflow-y-scroll transition-all duration-300 flex flex-col rounded-b-md absolute top-13 mt-1 w-60 -right-4 z-10 divide-y divide-gray-200 font-[roboto]`}>

              <button
                onClick={() => updateSelectMenu('Home')}
                className="p-2 font-bold text-left hover:bg-slate-100"
              >Home</button>
              <button
                onClick={() => updateSelectMenu('Contacts')}
                className="p-2 font-bold text-left hover:bg-slate-100"
              >Contacts</button>
              <Link
                onClick={() => setIsBurgerMenuOpen(false)}
                to={`/login-signup`}
                className="p-2 font-bold text-left hover:bg-slate-100"
              >Login/Signup</Link>

            </div>

          </div>
          :
          // Active other than mobile width
          <div className="flex gap-5 md:text-[20px] font-bold font-[roboto] text-[#e8f1f1] items-end">

            <button
              onClick={() => scrollTo.homeSection?.current.scrollIntoView()}
              className="hover:text-indigo-200 cursor-pointer"
            >Home</button>
            <button
              onClick={() => scrollTo.contactsSection?.current.scrollIntoView()}
              className="hover:text-indigo-200 cursor-pointer"
            >Contacts</button>
            <Link
              to={`/login-signup`}
              className="hover:text-indigo-200"
            >Login/Register</Link>

          </div>
        }
      </nav>
    </div>
  );
}