import { useContext, useEffect, useState } from "react";
import { UserContext } from "./layout/LayoutUser";

import CreateNoteForm from "../components/form/FormCreateNote";
import UnsaveDialog from "../components/modal/ModalUnsaveDialog";
import AddIcon from "../assets/icon/IconAdd";
import NotePreviewer from "../components/misc/NotePreviewer";
import NoteContainerUI from "../components/ui/UINoteContainer";
import PinnedNoteContainerUI from "../components/ui/UIPinnedNoteContainer";

export default function NotePage() {
  const { searchedTag, userNotes, userPinnedNotes } = useContext(UserContext);

  const [showForm, setShowForm] = useState(false);
  const [showUnsaveDialog, setShowUnsaveDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editableContent, setEditableContent] = useState({});
  const [previewableContent, setPreviewableContent] = useState({});
  const [showNotFound, setShowNotFound] = useState(false);

  const [renderedNotes, setRenderedNotes] = useState([]);

  // Handles keydown event for closing previewer
  useEffect(() => {
    const closePreview = event =>
      (event.key === 'Escape' && showPreview && !showUnsaveDialog) && setShowPreview(false);

    window.addEventListener('keydown', closePreview);

    return () => window.removeEventListener('keydown', closePreview);
  }, [showPreview]);

  // Set the fetched notes in the renderedNotes variable to show
  useEffect(() => setRenderedNotes(userNotes), [userNotes]);

  // Controls the real time search
  useEffect(() => {
    setShowNotFound(false);

    if (searchedTag === '') setRenderedNotes(userNotes);
    else {
      const toBeRendered = userNotes.filter(note => note.tag.toLowerCase().includes(searchedTag.toLowerCase()));

      toBeRendered.length ? setRenderedNotes(toBeRendered) : setShowNotFound(true);
    }
  }, [searchedTag]);

  // Kind of refreshes the form after every time it gets rendered
  function createNewNote() {
    setEditableContent({});
    setShowForm(true);
  }

  return (
    <div className={`pb-18`}>

      {/* Create or edit note form */}
      <>
        <div
          onClick={() => setShowForm(false)}
          className={`fixed z-20 bg-black/10 w-full h-full backdrop-blur-sm overflow-y-scroll ${!showForm && 'hidden'}`}
        ></div>
        <CreateNoteForm
          showForm={showForm}
          setShowForm={setShowForm}
          setShowUnsaveDialog={setShowUnsaveDialog}
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
        <div className={`fixed z-40 bg-black/10 w-full h-full backdrop-blur-xs ${!showUnsaveDialog && 'hidden'}`}></div>
        <UnsaveDialog
          showUnsaveDialog={showUnsaveDialog}
          setShowUnsaveDialog={setShowUnsaveDialog}
          setShowForm={setShowForm}
        />
      </>

      {/* Notes Container */}
      {showNotFound ?
        <h1 className={`dark:text-slate-100 fira-mono text-center mt-[40svh] text-xl md:text-3xl lg:text-4xl`}>Nothing Matched Your Search</h1>
        :
        <>
          {userPinnedNotes.length !== 0 &&
            <PinnedNoteContainerUI
              pinnedNotes={userPinnedNotes}
              setPreviewableContent={setPreviewableContent}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          }
          {renderedNotes?.map((note, index) =>
            <NoteContainerUI
              key={index}
              groupedNotes={note}
              setPreviewableContent={setPreviewableContent}
              setEditableContent={setEditableContent}
              setShowPreview={setShowPreview}
              setShowForm={setShowForm}
            />
          )}
        </>
      }

      {/* Add Note button */}
      <button
        onClick={createNewNote}
        title="Create Note"
        className={`fixed ${showForm ? 'z-0 scale-0' : 'z-10 scale-100'} transition-all duration-400 top-[85svh] right-[10svw] shadow-2xl border border-slate-400 active:bg-white text-2xl p-2 md:p-3 rounded-xl bg-[#bbbdfb]/25 dark:bg-slate-100 backdrop-blur-xs`}
      ><AddIcon />
      </button>

    </div>
  );
}