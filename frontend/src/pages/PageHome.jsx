import HomePageHeader from "../components/header/HeaderPublicSection";
import ContactCard from "../components/card/CardContact";
import { useRef } from "react";

export default function HomePage() {
  const home = useRef(null);
  const contacts = useRef(null);

  return (
    <div className={`fixed w-screen h-screen grid grid-cols-12 grid-rows-12`}>

      <header className={`col-span-12 row-start-0 row-end-1`}>
        <HomePageHeader
          scrollTo={{
            homeSection: home,
            contactsSection: contacts,
          }}
        />
      </header>

      <main className={`homepage-section col-span-12 row-start-1 row-end-13 overflow-y-scroll`}>

        {/* Welcome section */}
        <section
          ref={home}
          className="flex flex-col items-center justify-center h-svh font-bold text-gray-800"
        >
          <div className="p-4 backdrop-blur-xs bg-gray-300/25 rounded-2xl text-6xl md:text-7xl lg:text-8xl text-center">
            <h1 className="drop-shadow-lg walter">Never Lose</h1>
            <h1 className="drop-shadow-lg walter">Your Ideas...</h1>
          </div>
        </section>

        {/* Contacts section */}
        <section
          ref={contacts}
          className="h-svh flex flex-col"
        >
          <h1 className="py-20 text-center text-4xl sm:text-6xl font-[roboto] text-[#10466b]">Reach me through</h1>
          
          <div className="flex justify-center gap-5 sm:gap-8 md:gap-14">
            <ContactCard
              link={`https://github.com/d0ub1e-A`}
              src={`src/assets/GithubIcon.svg`}
              alt={`Github Icon`}
            ></ContactCard>
            <ContactCard
              link={`mailto:ahnafabid.casual@gmail.com`}
              src={`src/assets/GmailIcon.svg`}
              alt={`Gmail Icon`}
            ></ContactCard>
          </div>
        </section>

        <section className="bg-slate-700 flex justify-center items-center py-5 text-gray-300 font-[roboto] text-[1rem]">
          ©{new Date().getFullYear()}. d0ub1e-A. All rights reserved.
        </section>
      </main>

    </div>
  );
}