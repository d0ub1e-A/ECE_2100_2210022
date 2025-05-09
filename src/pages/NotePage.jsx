import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../App";

import NotePageHeader from "../components/NotePageHeader";
import CreateNoteForm from "../components/CreateNoteForm";
import DialogBox from "../components/DialogBox";
import AddIcon from "../assets/AddIcon";
import NoteCard from "../components/NoteCard";

export default function NotePage() {
  const { width } = useContext(GlobalState);

  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const allNotes = JSON.parse(localStorage.getItem('notes')) || [];

  // Handles keydown event (** WORK ON IT LATER **)
  // useEffect(() => {
  //   const handleEscape = e => {
  //     if (e.key === "Escape") {
  //       if (showForm && showDialog) setShowDialog(false);
  //       else if (showForm) setShowForm(false);
  //     }
  //   }

  //   document.addEventListener('keydown', handleEscape);

  //   return () => {
  //     document.removeEventListener('keydown', handleEscape);
  //   }
  // }, []);

  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>

      <header className={`col-span-12 row-start-0 row-end-1`}>
        <NotePageHeader allNotes={allNotes} />
      </header>

      <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll pb-18 bg-indigo-100/40`}>

        {/* New note form */}
        <>
          <div
            onClick={() => setShowForm(false)}
            className={`fixed z-20 bg-black/10 w-full h-full backdrop-blur-sm overflow-y-scroll ${!showForm && 'hidden'}`}
          ></div>
          <CreateNoteForm
            allNotes={allNotes}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowDialog={setShowDialog}
          />
        </>

        {/* Dialog box for confirmation of discarding unsaved changes */}
        <>
          <div className={`fixed z-40 bg-black/10 w-full h-full backdrop-blur-xs ${!showDialog && 'hidden'}`}></div>
          <DialogBox
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            setShowForm={setShowForm}
          />
        </>

        {/* Notes Container */}
        <section className={`pt-10 pb-16 px-7 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5`}>
          {allNotes.map((note, index) =>
            <NoteCard
              key={index}
              note={note}
            />
          )}
        </section>

        {/* Add Note button */}
        <button
          onClick={() => setShowForm(true)}
          title="Create Note"
          className={`fixed ${showForm ? 'z-0 scale-0' : 'z-10 scale-100'} transition-all duration-400 top-[85svh] right-[10svw] shadow-2xl border border-slate-400 active:bg-white text-2xl p-2 md:p-3 rounded-xl bg-[#bbbdfb]/25 backdrop-blur-xs`}
        ><AddIcon />
        </button>
      </main>

    </div>
  );
}