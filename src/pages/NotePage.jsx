import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../components/MenuIcon";

import NotePageHeader from "../components/NotePageHeader";
import CreateNoteForm from "../components/CreateNoteForm";
import { GlobalState } from "../App";
import DialogBox from "../components/DialogBox";

export default function NotePage() {
  const { width } = useContext(GlobalState);

  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [closeForm, setCloseForm] = useState(false);

  const allNotes = JSON.parse(localStorage.getItem('notes')) || [];

  // Handles keydown event
  useEffect(() => {
    const handleEscape = e => {
      if(e.key === "Escape") {
        if(showForm && showDialog) {
          console.log(`both form and dialog`);
          setShowDialog(false);
        }
        else if(showForm && !showDialog) {
          console.log(`only form`);
          setShowForm(false);
        }
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [showForm]);

  return (
    <>
      <NotePageHeader allNotes={allNotes} />

      <main className={`fixed z-20 w-screen h-full mt-19.5 sm:mt-24.5 pb-18`}>
        
        {/* New note form */}
        <>
          <div
            onClick={() => setCloseForm(true)}
            className={`fixed z-30 bg-black/10 w-screen h-screen backdrop-blur-lg inset-0 overflow-y-scroll ${!showForm && 'hidden'}`}
          ></div>
          <CreateNoteForm
            allNotes={allNotes}
            showForm={showForm}
            setShowForm={setShowForm}
            setShowDialog={setShowDialog}
            closeForm={closeForm}
          />
        </>

        {/* Dialog box */}
        <>
          <div
            onClick={() => setShowDialog(false)}
            className={`fixed z-50 bg-black/10 w-screen h-screen backdrop-blur-xs inset-0 overflow-y-scroll ${!showDialog && 'hidden'}`}
          ></div>
          <DialogBox
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            setShowForm={setShowForm}
          />
        </>

        <div className={`overflow-y-scroll py-4 px-7 h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5`}>
          {allNotes.map((note, index) => 
            <div
            key={index}
            className={`mb-5 border w-full p-3 max-h-50 overflow-y-scroll_`}
            >
              <p>{note.title ? note.title : 'Untitled'}</p>
              <p>{note.note ? note.note : 'Nothing noted down'}</p>
              <p>{note.tag ? note.tag : 'untagged'}</p>
              <p>{new Date(note['created_at']).toLocaleTimeString()}</p>
            </div>
          )}
        </div>
      </main>
      <button
        onClick={() => setShowForm(prevSate => !prevSate)}
        title="Create Note"
        className={`fixed ${showForm || showDialog ? 'z-10 scale-0' : 'z-20 scale-100'} transition-all duration-400  top-[80vh] right-[5vw] shadow-2xl border border-slate-400 bg-amber-50 active:bg-white text-2xl p-2 rounded-xl`}
      >➕</button>
    </>
  );
}