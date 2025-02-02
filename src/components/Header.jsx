import { useEffect, useState } from "react";
import SelectMenu from "./SelectMenu";

export default function Header() {
  const [spreadMenu, setSpreadMenu] = useState(window.innerWidth > 768);

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
          <h1 className="text-2xl sm:text-4xl md:text-5xl text-[#83c6f3] font-bold font-[roboto]">Quick Notes</h1>
        </div>
        <nav>
          {spreadMenu && (
            <ul className="flex gap-5 md:text-[20px] font-bold font-[roboto] text-[#29a7a7] items-end md:items-center">
              <a href="#home" className="hover:text-indigo-400">Home</a>
              <a href="#about" className="hover:text-indigo-400">About</a>
              <a href="#" className="hover:text-indigo-400">Login/Register</a>
            </ul>
          )}
          {!spreadMenu && (
            <SelectMenu 
              key={20}
              defaultOption={``}
              options={['Home', 'About', 'Login/Register']}
            />
          )}
        </nav>
      </div>
    </>
  );
}