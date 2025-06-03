import { useEffect, useRef, useState } from "react";

import ContactCard from "../components/card/CardContact";
import IconGithub from '../assets/icon/IconGithub.svg';
import IconGmail from '../assets/icon/IconGmail.svg';

export default function HomePage() {
  const home = useRef(null);
  const contacts = useRef(null);

  const [scrolledPixels, setScrolledPixels] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Log the total scrollable height and the current scroll position
      console.log('ScrollHeight:', document.documentElement.scrollHeight);
      console.log('ScrollY:', window.scrollY);
      setScrolledPixels(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`homepage-section bg-[url('src/components/ui/UIHomeBG.svg')]_ dark:bg-blend-soft-light bg-slate-100 dark:bg-slate-700`}>

      {/* Welcome section */}
      <section
        ref={home}
        className="flex flex-col items-center justify-center h-svh font-bold text-gray-800"
      >
        <div className="p-4 backdrop-blur-xs bg-gray-300/25 dark:bg-gray-500/50 dark:border-gray-900 dark:border rounded-2xl text-6xl md:text-7xl lg:text-8xl text-center dark:text-white">
          <h1 className="drop-shadow-lg walter">Never Lose</h1>
          <h1 className="drop-shadow-lg walter">Your Ideas...</h1>
        </div>
      </section>

      {/* Contacts section */}
      <section
        ref={contacts}
        className="h-svh flex flex-col"
      >
        <h1 className="py-20 text-center text-4xl sm:text-6xl font-[roboto] text-[#10466b] dark:text-[#acbef7] dark:font-bold">Reach me through</h1>

        <div className="flex justify-center gap-5 sm:gap-8 md:gap-14">
          <ContactCard
            link={`https://github.com/d0ub1e-A`}
            src={IconGithub}
            alt={`Github Icon`}
          ></ContactCard>
          <ContactCard
            link={`mailto:ahnafabid.casual@gmail.com`}
            src={IconGmail}
            alt={`Gmail Icon`}
          ></ContactCard>
        </div>
      </section>

      <section className="bg-slate-700 dark:bg-gray-300 flex justify-center items-center py-5 text-gray-300 dark:text-slate-700 font-[roboto] text-[1rem]">
        ©{new Date().getFullYear()}. d0ub1e-A. All rights reserved.
      </section>

    </div>
  );
}