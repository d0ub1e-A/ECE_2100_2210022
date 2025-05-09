import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../App";

import NotePageHeader from "../components/NotePageHeader";
import CreateNoteForm from "../components/CreateNoteForm";
import DialogBox from "../components/DialogBox";
import AddIcon from "../assets/AddIcon";
import NoteCard from "../components/NoteCard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownStyling, markDownToText } from "../assets/MarkdownStyling";

export default function NotePage() {
  const { width } = useContext(GlobalState);

  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editableContent, setEditableContent] = useState({});
  const [previewableContent, setPreviewableContent] = useState({
    'created_at': new Date().toISOString()
  });

  const allNotes = JSON.parse(localStorage.getItem('notes')) || [];

  return (
    <div className={`fixed h-screen w-screen grid grid-cols-12 grid-rows-12`}>

      <header className={`col-span-12 row-start-0 row-end-1`}>
        <NotePageHeader allNotes={allNotes} />
      </header>

      <main className={`col-span-12 row-start-1 row-end-13 overflow-y-scroll pb-18 bg-indigo-100/40`}>

        {/* Create or edit not form */}
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
            editableContent={editableContent}
          />
        </>

        {/* Note previewer */}
        <>
          <div
            onClick={() => setShowPreview(false)}
            className={`fixed z-20 bg-black/10 w-full h-full backdrop-blur-sm overflow-y-scroll ${!showPreview && 'hidden'}`}
          ></div>
          <div className={`fixed grid grid-cols-12 grid-rows-12 z-30 w-[90svw] lg:w-[80svw] xl:w-[60svw] h-[80svh] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-7 pb-6 overflow-y-scroll rounded-md bg-white text-slate-800 dark:bg-slate-700 dark:text-white ${showPreview ? 'scale-100' : 'scale-0'} transition-all duration-300`}>
            <h1 className={`cal-sans col-span-12 row-start-0 row-end-1 bg-white py-5 text-center text-2xl lg:text-4xl`}>{previewableContent?.title}</h1>
            <h2 className={`fira-mono place-self-end col-start-7 col-end-13 row-start-1 row-end-2`}>{new Date(previewableContent['created_at'].replace('Z', '+06:00')).toLocaleDateString()}</h2>
            <div className={`col-span-12 row-start-2 row-end-12 overflow-y-scroll`}>
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={markdownStyling}
              >{markDownToText(previewableContent?.note)}
              </Markdown>
            </div>
            <p className={`w-fit h-fit row-start-12 row-end-13 bg-gray-200 shadow-md fira-mono truncate p-1.5 flex items-center rounded-full`}>{previewableContent.tag ? previewableContent.tag : 'untagged'}</p>
          </div>
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
          {allNotes.map((note, index) =>
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
          onClick={() => setShowForm(true)}
          title="Create Note"
          className={`fixed ${showForm ? 'z-0 scale-0' : 'z-10 scale-100'} transition-all duration-400 top-[85svh] right-[10svw] shadow-2xl border border-slate-400 active:bg-white text-2xl p-2 md:p-3 rounded-xl bg-[#bbbdfb]/25 backdrop-blur-xs`}
        ><AddIcon />
        </button>
      </main>

    </div>
  );
}