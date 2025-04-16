import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../components/MenuIcon";

import NotePageHeader from "../components/NotePageHeader";

export default function NotePage() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(window.innerWidth < 768);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  
  // Determines the window width
  useEffect(() => {
    const handleResize = () => setShowBurgerMenu(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <NotePageHeader/>
      <section className={`fixed z-10 w-screen h-screen mt-24 sm:mt-32`}>
        <div>Notes here</div>
      </section>
    </>
  );
}