import { useEffect, useState } from "react";

import NotePageHeader from "../components/header/HeaderUserSection";
import CreateNoteForm from "../components/form/FormCreateNote";
import DialogBox from "../components/modal/ModalDialogBox";
import AddIcon from "../assets/icon/IconAdd";
import NoteCard from "../components/card/CardNote";
import NotePreviewer from "../components/misc/NotePreviewer";
import { api } from "../assets/util/UtilApi";

export default function NotePage() {
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editableContent, setEditableContent] = useState({});
  const [previewableContent, setPreviewableContent] = useState({});

  const [userNotes, setUserNotes] = useState(null);

  // Handles keydown event for closing previewer
  useEffect(() => {
    const closePreview = event =>
      (event.key === 'Escape' && showPreview) && setShowPreview(false);

    window.addEventListener('keydown', closePreview);

    return () => window.removeEventListener('keydown', closePreview);
  }, [showPreview]);

  useEffect(() => {
    async function fetchUserNotes () {
      try {
        const serverRes = await api.get(`/user/notes`);

        setUserNotes(serverRes.data);
      }
      catch(error) {
        console.error(error.status + error.message);
      }
    }

    fetchUserNotes();
  }, []);

  // Kind of refreshes the form after every time it gets rendered
  function createNewNote() {
    setEditableContent({});
    setShowForm(true);
  }

  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>

      <header className={`col-span-12 row-start-0 row-end-1`}>
        <NotePageHeader />
      </header>

      <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll pb-18 bg-indigo-100/40 dark:bg-slate-800`}>

        {/* Create or edit note form */}
        <>
          <div
            onClick={() => setShowForm(false)}
            className={`fixed z-20 bg-black/10 w-full h-full backdrop-blur-sm overflow-y-scroll ${!showForm && 'hidden'}`}
          ></div>
          <CreateNoteForm
            showForm={showForm}
            setShowForm={setShowForm}
            setShowDialog={setShowDialog}
            editableContent={editableContent}
          />
        </>

        {/* Note previewer */}
        <>
          <div
            onClick={() => setShowPreview(false)}
            className={`fixed z-20 bg-black/10 w-full h-full backdrop-blur-sm overflow-y-scroll ${!showPreview && 'hidden'}`}
          ></div>
          <NotePreviewer
            previewableContent={previewableContent}
            showPreview={showPreview}
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
        <section className={`pt-10 pb-16 px-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5`}>
          {userNotes?.map((note, index) =>
            <NoteCard
              key={index}
              note={note}
              setPreviewableContent={setPreviewableContent}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          )}
        </section>

        {/* Add Note button */}
        <button
          onClick={createNewNote}
          title="Create Note"
          className={`fixed ${showForm ? 'z-0 scale-0' : 'z-10 scale-100'} transition-all duration-400 top-[85svh] right-[10svw] shadow-2xl border border-slate-400 active:bg-white text-2xl p-2 md:p-3 rounded-xl bg-[#bbbdfb]/25 dark:bg-slate-100 backdrop-blur-xs`}
        ><AddIcon />
        </button>

      </main>

    </div>
  );
}