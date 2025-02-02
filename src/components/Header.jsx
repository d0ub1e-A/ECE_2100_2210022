import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";

export default function Header() {
  const [spreadMenu, setSpreadMenu] = useState(window.innerWidth > 768);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const updateSelectMenu = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleResize = () => setSpreadMenu(window.innerWidth > 768);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
    <>
      <div className={`fixed w-full flex justify-between items-center px-4 md:px-8 py-5 bg-indigo-600/90 backdrop-blur-sm shadow-xl z-10`}>
        <div className="flex gap-3 items-center">
          <img src="src\assets\quickNotesLogo.png" alt="Quick Notes Logo" className="w-15 md:w-25 drop-shadow-lg"/>
          <Link to={`/`}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-[#83c6f3] font-bold font-[roboto]">Quick Notes</h1>
          </Link>
        </div>
        <nav>
          {spreadMenu && (
            <ul className="flex gap-5 md:text-[20px] font-bold font-[roboto] text-[#29a7a7] items-end md:items-center">
              <li><a href={`#home`}>Home</a></li>
              <li><a href={`#about`}>About</a></li>
              <li><Link to={`/login`}>Login/Register</Link></li>
            </ul>
          )}
          {!spreadMenu && (
            <div className="w-fit p-1.5 border-gray-400 rounded-md cursor-pointer z-20">
              <div className="flex items-center justify-end gap-4" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-bold font-[roboto] text-[#29a7a7] w-fit text-[20px]">{selectedValue}</span>
                <MenuIcon open={isOpen}></MenuIcon>
              </div>
              {isOpen && (
                <ul className="flex flex-col bg-slate-200 rounded-b-md transition">
                  <li><a href={`#home`} className="p-2 hover:text-indigo-400" onClick={() => updateSelectMenu("Home")}>Home</a></li>
                  <li><a href={`#about`} className="p-2 hover:text-indigo-400" onClick={() => updateSelectMenu("About")}>About</a></li>
                  <li><Link to={`/login`} className="p-2 hover:text-indigo-400" onClick={() => updateSelectMenu("Login/Register")}>Login/Register</Link></li>
                </ul>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}