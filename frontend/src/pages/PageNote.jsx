import { useEffect, useState } from "react";
import { api } from "../assets/util/UtilApi";

import CreateNoteForm from "../components/form/FormCreateNote";
import UnsaveDialog from "../components/modal/ModalUnsaveDialog";
import AddIcon from "../assets/icon/IconAdd";
import NotePreviewer from "../components/misc/NotePreviewer";
import NoteContainerUI from "../components/ui/UINoteContainer";

export default function NotePage() {
  const [showForm, setShowForm] = useState(false);
  const [showUnsaveDialog, setShowUnsaveDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editableContent, setEditableContent] = useState({});
  const [previewableContent, setPreviewableContent] = useState({});
  const [deletableContent, setDeletableContent] = useState({});

  const [userNotes, setUserNotes] = useState([]);
  const [renderedNotes, setRenderedNotes] = useState([]);
  const [tagList, setTagList] = useState([]);

  // Handles keydown event for closing previewer
  useEffect(() => {
    const closePreview = event =>
      (event.key === 'Escape' && showPreview && !showUnsaveDialog) && setShowPreview(false);

    window.addEventListener('keydown', closePreview);

    return () => window.removeEventListener('keydown', closePreview);
  }, [showPreview]);

  // Fetch notes created by the user from the server
  useEffect(() => {
    async function fetchUserNotes() {
      try {
        const serverRes = await api.get(`/user/notes`);
        const allNotes = serverRes.data;

        arrangeNotes(allNotes);
      }
      catch (error) {
        console.error(error.status + error.message);
      }
    }

    fetchUserNotes();
  }, []);

  // Arrange the notes by tag name and create a new array of objects containing the tag name and associated array
  function arrangeNotes(notes) {
    const tags = [...new Set(notes.map(note => note.tag))];
    const categorizedNotes = tags.map(tag => ({
      tag: tag,
      notes: notes.filter(note => note.tag === tag),
    }));

    // console.log(tags);
    // console.log(categorizedNotes);

    setTagList(tags);
    setUserNotes(categorizedNotes);
    setRenderedNotes(categorizedNotes);
  }

  // Kind of refreshes the form after every time it gets rendered
  function createNewNote() {
    setEditableContent({});
    setShowForm(true);
  }

  return (
    <div className={`pb-18 bg-indigo-50 dark:bg-slate-800`}>

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