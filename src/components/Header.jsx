import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";

export default function Header({scrollTo}) {
  const [showBurgerMenu, setShowBurgerMenu] = useState(window.innerWidth < 768);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  
  // Handles menu (opens only when in monile width) ops
  function updateSelectMenu(option) {
    const scrollSection = {
      Home: scrollTo.homeSection,
      Contacts: scrollTo.contactsSection,
    }

    setSelectedValue(option);
    setIsBurgerMenuOpen(false);
    scrollSection[option]?.current.scrollIntoView();
    
  }

  // Determines the window width
  useEffect(() => {
    const handleResize = () => setShowBurgerMenu(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      onClick={() => isBurgerMenuOpen && setIsBurgerMenuOpen(false)}
      className={`fixed w-full flex justify-between items-center px-4 md:px-8 py-5 bg-indigo-600/90 backdrop-blur-sm shadow-xl z-10`}>

      {/* Logo and name section */}
      <div className="flex gap-3 items-center">
        <img
          src="src\assets\quickNotesLogo.png"
          alt="Quick Notes Logo"
          className="w-15 md:w-25 drop-shadow-lg"
        />
        <Link to={`/`}>
          <h1 
          onClick={() => showBurgerMenu ? updateSelectMenu('Home') : scrollTo.homeSection?.current.scrollIntoView()}
          className="text-2xl sm:text-4xl md:text-5xl text-[#83c6f3] font-bold font-[roboto]">Quick Notes</h1>
        </Link>
      </div>

      {/* Navigation bar */}
      <nav>

        {showBurgerMenu ?
          // Active in mobile width
          <div className="w-fit p-1.5 border border-indigo-600 rounded-md relative">

            {/* Toggle menu */}
            <div
              onClick={() => setIsBurgerMenuOpen(prevCondition => !prevCondition)}
              className="flex items-center justify-end gap-4 cursor-pointer"
            >
              <span className="font-bold font-[roboto] text-[#29a7a7] text-[20px]">{selectedValue}</span>
              <MenuIcon open={isBurgerMenuOpen}></MenuIcon>
            </div>

            {/* The menu */}
            <div className={`${isBurgerMenuOpen ? "bg-slate-300 shadow-xl" : "scale-y-0"} transition-all duration-300 flex flex-col rounded-b-md absolute top-full right-0 mt-1 w-35 z-10 divide-y divide-gray-200 border border-gray-400 font-[roboto]`}>

              <button
                onClick={() => updateSelectMenu('Home')}
                className="p-2 font-bold text-left"
              >Home</button>
              <button
                onClick={() => updateSelectMenu('Contacts')}
                className="p-2 font-bold text-left"
              >Contacts</button>
              <Link
                to={`/login-signup`}
                className="p-2 font-bold text-left"
              >Login/Signup</Link>

            </div>

          </div>
          :
          // Active other than mobile width
          <div className="flex gap-5 md:text-[20px] font-bold font-[roboto] text-[#29a7a7] items-end md:items-center">

            <button
              onClick={() => scrollTo.homeSection?.current.scrollIntoView()}
              className=" hover:text-indigo-300"
            >Home</button>
            <button
              onClick={() => scrollTo.contactsSection?.current.scrollIntoView()}
              className=" hover:text-indigo-300"
            >Contacts</button>
            <Link
              to={`/login-signup`}
              className=" hover:text-indigo-300"
            >Login/Register</Link>

          </div>
        }
      </nav>
    </div>
  );
}