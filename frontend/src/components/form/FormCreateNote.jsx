import { useRef, useState, useEffect } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import EditIcon from "../../assets/icon/IconEdit";

export default function CreateNoteForm({ allNotes, showForm, setShowDialog, setShowForm, editableContent }) {
  const titleRef = useRef(null);
  const formRef = useRef(null);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');
  const [warning, setWarning] = useState('');
  const [invalidTag, setInvalidTag] = useState(false);

  // Handles default job after opening or closing the not taking form
  useEffect(() => {console.log( editableContent ? 'something' : 'nothing');
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

  function addNote(note) {
    let noteIndex = null;
    
    allNotes.some((el, index) => {
      noteIndex = (el.created_at === editableContent.created_at) ? index : null;
    });
  }
  
  // Thorough check on submitted data
  function handlesubmit(e) {
    e.preventDefault();

    const creationDate = new Date();
    let noteData = acquireFormData(e);

    noteData = tag ? 
    {...noteData} : {...noteData, tag: 'untagged'}
    
    // Adds newly added note into local storage
    allNotes.unshift({
      ...noteData,
      created_at: creationDate
    });

    const toBeSaved = addNote(noteData);

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
      className={`bg-gray-100 fixed top-27 left-1/2 -translate-x-1/2 border border-slate-300 shadow-md flex flex-col p-5 rounded-lg gap-2 md:gap-3 max-h-[90svh] overflow-y-scroll z-30 ${showForm ? 'scale-100 skew-0' : 'scale-0 -skew-x-15'} duration-300 transition-all`}
      // className={`bg-gray-100 fixed top-27 left-1/2 -translate-x-1/2 border border-slate-300 shadow-xl flex flex-col p-5 rounded-lg gap-2 md:gap-3 max-h-[90svh] overflow-y-scroll z-30 duration-300 transition-all`}
    >
      {(isMobile || isTablet) &&
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
        value={editableContent?.title}
        className={`bg-gray-100/90 ${title === '' ? '' : 'border border-slate-400'} outline-none text-lg md:text-2xl p-2 rounded font-semibold`}
      />
      <div>
        <label
          htmlFor="note"
          className={`font-semibold text-lg md:text-2xl text-black flex items-center gap-3`}
        ><EditIcon/> Note</label>
        <textarea
          name="note"
          id="note"
          placeholder="Write in markdown for a better view..."
          onChange={(e) => setNote(e.target.value)}
          defaultValue={editableContent?.note ? editableContent.note : ''}
          className={`min-h-[40svh] min-w-[85svw] md:min-w-[55svw] mt-2 bg-white p-2 text-sm md:text-[16px] resize-none outline-none shadow-inner rounded`}
        ></textarea>
      </div>
      <input
        name="tag"
        id="tag"
        placeholder="Add a tag to categorize easily e.g. project"
        onChange={(e) => setTag(e.target.value)}
        value={editableContent?.tag}
        className={`border border-slate-200 bg-white outline-none shadow-md rounded p-2 text-sm md:text-[16px]`}
      />
      <p className={`text-red-400 ${invalidTag ? 'scale-100' : 'scale-0'} text-left transition-all duration-200`}>You can not use this tag...</p>
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="submit"
          value={editableContent.title ? 'Update Note' : 'Create Note'}
          className={`bg-purple-500 rounded p-1.5 text-lg w-full md:w-30 mx-auto font-semibold text-white sm:hover:scale-105 transition-all duration-300 shadow-md`}
        />
        {isDesktop &&
          <button
            type="button"
            onClick={closeNoteForm}
            className={`bg-red-500/90 rounded p-1.5 text-lg w-full md:w-30 mx-auto font-semibold text-white sm:hover:scale-105 transition-all duration-300 shadow-md`}
          >Cancel</button>
        }
      </div>
    </form>
  );
}