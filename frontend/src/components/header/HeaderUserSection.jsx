import { Link } from "react-router-dom";

export default function UserSectionHeader() {
  return (
    <div className={`flex justify-between items-center px-4 md:px-8 py-4 md:py-2 bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-xl`}>

      {/* Logo and name section */}
      <div className="flex gap-3 items-center">
        <img
          src="src\components\ui\UIQuickNotesLogo.png"
          alt="Quick Notes Logo"
          className="w-10 md:w-16 drop-shadow-lg"
        />
        <Link to={`/`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-amber-100 font-bold patrick-hand">Quick Notes</h1>
        </Link>
      </div>

      {/* Navigation bar */}
      <nav>

      </nav>
    </div>
  );
}