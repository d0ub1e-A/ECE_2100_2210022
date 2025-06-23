import { useRef, useState, useEffect, useContext } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { api } from "../../assets/util/UtilApi";

import EditIcon from "../../assets/icon/IconEdit";
import { UserContext } from "../../pages/layout/LayoutUser";

export default function CreateNoteForm({ showForm, setShowUnsaveDialog, setShowForm, editableContent }) {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const { setRefetch, refetch } = useContext(UserContext);

  const [title, setTitle] = useState(editableContent.title || '');
  const [note, setNote] = useState(editableContent.note || '');
  const [tag, setTag] = useState(editableContent.tag || '');
  const [warning, setWarning] = useState('');
  const [invalidTag, setInvalidTag] = useState(false);

  const inEditMode = Object.keys(editableContent).length !== 0;
  const invalidTags = [/(?:\s+|^)unt[a@][g&][g&]?[e3]?d?(?:\s+[A-Z]?[0-9]?|$)/i];

  // Handles default job after opening or closing the not taking form
  useEffect(() => {
    if (!showForm) return;

    titleRef.current?.focus();
    formRef.current?.reset();
    setWarning('');
    // setTitle('');
    // setNote('');
    // setTag('');
    setInvalidTag(false);
  }, [showForm]);

  // Prevents users from setting tag as 'untagged'
  useEffect(() => 
    !inEditMode && setInvalidTag(invalidTags.some(pattern => pattern.test(tag))), [tag]);

  // handles keydown event
  useEffect(() => {
    const handleKeydown = event =>
      (event.key === 'Escape' && showForm) && closeNoteForm();

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [showForm, title, note, tag]);

  // Creates a new note
  async function sendNoteInfo({ title, note, tag }, e) {
    const noteObj = {
      title: title,
      note: note,
      tag: tag.toLowerCase() || '',
    };
    console.log(`From async`, noteObj);

    // try {
    //   const sendNoteRes = inEditMode ?
    //     await api.patch(`/notes/${editableContent.note_id}`, noteObj) :
    //     await api.post(`/notes`, noteObj);

    //   const response = sendNoteRes.status;

    //   if (response === 201 || response === 200) {
    //     e.currentTarget?.reset();
    //     setShowForm(false);
    //     setRefetch(!refetch);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  // Thorough check on submitted data
  function handlesubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const noteData = Object.fromEntries(formData);
    // console.log(`handle submit:`, noteData);

    if (title && !invalidTag) {
      sendNoteInfo(noteData, e);
      console.log(`aaa`);
    }
    else setWarning('Provide a title to save the note...');
  }

  // Check whether user want to close the form with unsaved data
  function closeNoteForm() {
    if (note !== '' || tag !== '' || title !== '') setShowUnsaveDialog(true);
    else if (!note && !tag && !title) setShowForm(false);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handlesubmit}
      className={`bg-gray-100 dark:bg-gray-700 fixed top-27 left-1/2 -translate-x-1/2 border border-slate-300 shadow-md flex flex-col p-5 rounded-lg gap-2 md:gap-3 max-h-[90svh] overflow-y-scroll z-30 ${showForm ? 'scale-100 skew-0' : 'scale-0 -skew-x-15'} duration-300 transition-all`}
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
        onChange={e => setTitle(e.target.value)}
        defaultValue={editableContent?.title}
        className={`bg-gray-100/90 dark:bg-gray-500 dark:text-slate-200 ${title === '' ? '' : 'border border-slate-400'} outline-none text-lg md:text-2xl p-2 rounded font-semibold`}
      />
      <div>
        <label
          htmlFor="note"
          className={`font-semibold text-lg md:text-2xl text-black dark:text-white flex items-center gap-3`}
        ><EditIcon /> Note</label>
        <textarea
          name="note"
          id="note"
          placeholder="Write in markdown for a better view..."
          onChange={e => setNote(e.target.value)}
          defaultValue={editableContent?.note || ''}
          className={`min-h-[40svh] min-w-[85svw] md:min-w-[55svw] mt-2 bg-white dark:bg-gray-500 dark:text-slate-200 p-2 text-sm md:text-[16px] resize-none outline-none shadow-inner rounded`}
        ></textarea>
      </div>
      <input
        name="tag"
        id="tag"
        placeholder="Add a tag to categorize easily e.g. project"
        onChange={e => setTag(e.target.value)}
        defaultValue={editableContent?.tag}
        className={`bg-white dark:bg-gray-500 dark:text-slate-200 outline-none shadow-md rounded p-2 text-sm md:text-[16px]`}
      />
      <p className={`text-red-400 ${invalidTag ? 'scale-100' : 'scale-0'} text-left transition-all duration-200`}>You can not use this tag...</p>
      <div className="flex gap-3 flex-col sm:flex-row">
        <button className={`bg-purple-500 rounded p-1.5 text-lg w-full md:w-30 mx-auto font-semibold text-white sm:hover:scale-105 transition-all duration-300 shadow-md`}>{inEditMode ? 'Update Note' : 'Create Note'}</button>
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