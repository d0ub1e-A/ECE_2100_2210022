import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../App";

import NotePageHeader from "../components/NotePageHeader";
import CreateNoteForm from "../components/CreateNoteForm";
import DialogBox from "../components/DialogBox";

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

      <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll pb-18`}>

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
        <section className={`py-4 px-7 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5`}>
          {allNotes.map((note, index) =>
            <div
              key={index}
              className={`relative p-3 max-h-50 rounded-lg shadow-xl bg-amber-100/10 hover:scale-105 transition-all duration-300`}
            >
              <h2 className={`py-7 font-bold cal-sans`}>{note.title ? note.title : 'Untitled'}
                <span className={`absolute inset-0 cursor-pointer`}></span>
              </h2>
              <p className={`truncate`}>{note.note ? note.note : 'Nothing noted down'}</p>
              <p>{note.tag ? note.tag : 'untagged'}</p>
              <p>{new Date(note['created_at']).toLocaleTimeString()}</p>
            </div>
          )}
        </section>

        {/* Add Note button */}
        <button
          onClick={() => setShowForm(true)}
          title="Create Note"
          className={`fixed ${showForm ? 'z-0 scale-0' : 'z-10 scale-100'} transition-all duration-400  top-[80vh] right-[5vw] shadow-2xl border border-slate-400 bg-amber-50 active:bg-white text-2xl p-2 rounded-xl`}
        >➕</button>
      </main>

    </div>
  );
}