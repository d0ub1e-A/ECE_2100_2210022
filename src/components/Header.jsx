export default function Header() {
  return(
    <>
      <div className="fixed w-full flex justify-between items-center px-4 md:px-8 py-5 bg-gradient-to-b from-[#b0fff2] to-[#03aaec] shadow-xl">
        <div className="flex gap-3 items-center">
          <img src="src\assets\quickNotesLogo.png" alt="Quick Notes Logo" className="w-15 md:w-25"/>
          <h1 className="text-xl md:text-5xl text-[#10466b] font-bold font-[roboto]">Quick Notes</h1>
        </div>
        <nav>
          <ul className="flex gap-5 md:text-[20px] font-bold font-[roboto] text-[#057474] items-end md:items-center">
            <a href="#" className="hover:text-indigo-500">Home</a>
            <a href="#" className="hover:text-indigo-500">About</a>
            <a href="#" className="hover:text-indigo-500">Login/Register</a>
          </ul>
        </nav>
      </div>
    </>
  );
}