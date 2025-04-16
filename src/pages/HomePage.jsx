import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactCard from "../components/ContactCard";
import { useRef } from "react";

export default function HomePage() {
  const home = useRef(null);
  const contacts = useRef(null);
  
  return (
    <>
      <Header
        scrollTo={{
          homeSection: home,
          contactsSection: contacts,
        }}
      ></Header>

      <main className={`homepage-section`}>

        {/* Welcome section */}
        <section
          ref={home}
          className="flex flex-col items-center justify-center h-screen font-bold text-gray-800"
        >
          <div className="p-4 backdrop-blur-xs bg-gray-300/25 rounded-2xl text-6xl md:text-7xl lg:text-8xl text-center">
            <h1 className="drop-shadow-lg walter">Never Lose</h1>
            <h1 className="drop-shadow-lg walter">Your Ideas...</h1>
          </div>
        </section>

        {/* Contacts section */}
        <section
          ref={contacts}
          className="pt-32 h-screen flex flex-col gap-20"
        >
          <h1 className="h-fit pt-20 text-center text-4xl sm:text-6xl font-[roboto] text-[#10466b]">Reach me through</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
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

      </main>

      <Footer></Footer>
    </>
  );
}