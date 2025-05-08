import { useRef, useState, useEffect, useContext } from "react";
import { GlobalState } from "../App";

export default function CreateNoteForm({ allNotes, showForm, setShowDialog, setShowForm }) {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const { width } = useContext(GlobalState);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');
  const [warning, setWarning] = useState('');
  const [invalidTag, setInvalidTag] = useState(false);

  // Handles default job after opening or closing the not taking form
  useEffect(() => {
    if (showForm) {
      titleRef.current?.focus();
      formRef.current?.reset();
      setWarning('');
      setTitle('');
      setNote('');
      setTag('');
      setInvalidTag(false);
    }
  }, [showForm]);

  // Prevents users from setting tag as 'untagged'
  useEffect(() => setInvalidTag(tag.toLowerCase() === 'untagged'), [tag]);

  // handles keydown event
  useEffect(() => {
    const handleKeydown = event =>
      (event.key === 'Escape' && showForm) && closeNoteForm();

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [showForm]);

  // Primarily form data are turned into objects
  function acquireFormData(e) {
    const formData = new FormData(e.currentTarget);
    const noteData = Object.fromEntries(formData);

    return noteData;
  }

  // Thorough check on submitted data
  function handlesubmit(e) {
    e.preventDefault();

    const creationDate = new Date();
    const noteData = acquireFormData(e);

    // add newly added note into local storage
    allNotes.unshift({
      ...noteData,
      'created_at': creationDate
    });

    if (title && !invalidTag) {
      localStorage.setItem('notes', JSON.stringify(allNotes));
      e.currentTarget.reset();
      setShowForm(false);
    }
    else setWarning('Provide a title to save the note...');
  }

  // Check whether user want to close the form with unsaved data
  function closeNoteForm() {
    if (note !== '' || tag !== '' || title !== '') setShowDialog(true);
    else if (!note && !tag && !title) setShowForm(false);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handlesubmit}
      className={`bg-gray-100 fixed top-27 left-1/2 -translate-x-1/2 border shadow-xl flex flex-col p-5 rounded-lg gap-2 md:gap-3 max-h-[90svh] overflow-y-scroll z-30 ${showForm ? 'scale-100 skew-0' : 'scale-0 -skew-x-15'} duration-300 transition-all`}
    >
      {width <= 768 &&
        <button
          type="button"
          onClick={closeNoteForm}
          className={`bg-slate-300 hover:bg-slate-400/60 cursor-pointer hover:shadow-xl font-normal md:font-semibold sticky top-0 left-full w-10 md:w-12 h-10 md:h-12 md:p-2 rounded-full text-sm md:text-lg z-30`}
        >❌</button>
      }
      <input
        type="text"
        name="title"
        id="title"
        placeholder={warning ? warning : "Title"}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        className={`bg-gray-100/90 ${title === '' ? '' : 'border-2 border-slate-500'} outline-none text-lg md:text-2xl p-2 rounded font-semibold`}
      />
      <div>
        <label
          htmlFor="note"
          className={`font-semibold  text-lg md:text-2xl text-black`}
        >📰 Note</label>
        <textarea
          name="note"
          id="note"
          placeholder="Write in markdown for a better view..."
          onChange={(e) => setNote(e.target.value)}
          className={`min-h-[40vh] max-h-[70vh]_ min-w-[85vw] md:min-w-[55vw] mt-2 bg-white overflow-scroll border-2 border-slate-500 p-2 text-sm md:text-[16px] resize-none outline-none shadow-xl rounded`}
        ></textarea>
      </div>
      <input
        name="tag"
        id="tag"
        placeholder="Add a tag to categorize easily e.g. project"
        onChange={(e) => setTag(e.target.value)}
        className={`border-2 border-slate-500 bg-white outline-none shadow-xl rounded p-2 text-sm md:text-[16px]`}
      />
      <p className={`text-red-400 ${invalidTag ? 'scale-100' : 'scale-0'} text-left transition-all duration-200`}>You can not use this tag...</p>
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="submit"
          value="Create Note"
          className={`bg-purple-500 rounded p-1.5 text-lg w-full md:w-30 mx-auto font-semibold text-white sm:hover:scale-105 transition-all duration-300 shadow-md`}
        />
        {width > 768 &&
          <button
            type="button"
            onClick={closeNoteForm}
            className={`bg-red-500/90 rounded p-1.5 text-lg w-full sm:w-30 mx-auto font-semibold text-white sm:hover:scale-105 transition-all duration-300 shadow-md`}
          >Cancel</button>
        }
      </div>
    </form>
  );
}