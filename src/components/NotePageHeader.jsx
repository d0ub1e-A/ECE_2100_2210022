import { Link } from "react-router-dom";

export default function NotePageHeader() {
  return (
    <div className={`fixed w-full flex justify-between items-center px-4 md:px-8 py-5 bg-indigo-600/90 backdrop-blur-sm shadow-xl z-10`}>

      {/* Logo and name section */}
      <div className="flex gap-3 items-center">
        <img
          src="src\assets\quickNotesLogo.png"
          alt="Quick Notes Logo"
          className="w-15 md:w-25 drop-shadow-lg"
        />
        <Link to={`/`}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl text-[#83c6f3] font-bold font-[roboto]">Quick Notes</h1>
        </Link>
      </div>

      {/* Navigation bar */}
      <nav>

      </nav>
    </div>
  );
}