import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useContext, useEffect, useRef, useState } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { markdownStyling, markDownToText } from "../../assets/util/UtilMarkdownStyling.jsx";
import { api } from "../../assets/util/UtilApi.js";
import { calcDateTime } from "../../assets/util/UtilCalcDateTime.js";
import { UserContext } from "../../pages/layout/LayoutUser.jsx";
import { NoteDeleteContext } from "../../pages/PageNote.jsx";

import PreviewIcon from '../../assets/icon/IconPreview.jsx';
import EditIcon from '../../assets/icon/IconEdit.jsx';
import ThreeDotIcon from '../../assets/icon/IconThreeDot.jsx';
import DeleteIcon from '../../assets/icon/IconDelete.jsx';
import CalendarIcon from '../../assets/icon/IconCalendar.jsx'
import PinIcon from '../../assets/icon/IconPin.jsx';

export default function NoteCard({ note, setPreviewableContent, setEditableContent, setShowPreview, setShowForm }) {
  const menuRef = useRef(null);
  const { setRefetch } = useContext(UserContext);
  const {setShowDeleteDialog, setDeletableNoteId} = useContext(NoteDeleteContext);

  const [showMenu, setShowMenu] = useState(false);

  // handles mouse click for closing the menu in touch screen devices
  useEffect(() => {
    const closeMenu = e =>
      (menuRef.current && !menuRef.current.contains(e.target)) && setShowMenu(false);

    window.addEventListener('mousedown', closeMenu);

    return () => window.removeEventListener('mousedown', closeMenu);
  }, []);

  // opens the form for editing any existing content
  function editNote() {
    setEditableContent(note);
    setShowForm(true);
  }

  // opens the note previewer
  function previewNote() {
    setPreviewableContent(note);
    setShowPreview(true);
  }

  // pin any note no top
  async function pinNotes(id) {
    try {
      const pinningRes = await api.patch(`/notes/${id}/pin`);

      pinningRes.status === 200 && setRefetch(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  // function for starting of deletion
  function startDeleting() {
    setShowDeleteDialog(true);
    setDeletableNoteId(note.note_id);
  }

  return (
    <div className={`relative w-[300px] group z-10 flex flex-col gap-7 p-8 rounded-lg bg-amber-100/20 dark:bg-slate-700 dark:text-white hover:-translate-y-2_ transition-all duration-300 note-card`}>

      {/* Title + pin icon + 3 dot menu section for touch screen devices */}
      <div className={`relative items-center font-bold cal-sans text-xl md:text-3xl flex justify-between`}>
        <button
          onClick={() => pinNotes(note.note_id)}
          className={`hover:scale-110 transition-all absolute -top-[45px] -left-[45px]`}
        ><PinIcon className={`${note.pinned ? '-rotate-45' : 'translate-y-[20px] translate-x-[15px] group-hover:translate-y-0 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all'}`} />
        </button>
        <h2 className={`w-full truncate`}>{note?.title}</h2>

        {/* Delete button */}
        {isDesktop &&
          <button
            onClick={startDeleting}
            className={`p-1.5 rounded-full hover:border hover:border-red-300 hover:bg-slate-300/80 transition-all`}
          ><DeleteIcon />
          </button>
        }

        {/* Menu active in mobile or tablet */}
        {(isMobile || isTablet) &&
          <div ref={menuRef}>

            <button
              onClick={() => setShowMenu(prev => !prev)}
              className={`p-1.5 bg-slate-300 rounded-full w-fit`}
            ><ThreeDotIcon />
            </button>

            <div className={`absolute ${showMenu ? 'opacity-100 border border-slate-300 max-h-40' : 'opacity-0 max-h-0'} overflow-y-hidden z-10 right-0 top-10 flex flex-col divide-y divide-slate-300 bg-amber-50 rounded-lg shadow-lg transition-all duration-200`}>
              <button
                onClick={previewNote}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}
              ><PreviewIcon /> Preview
              </button>
              <button
                onClick={editNote}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}
              ><EditIcon /> Edit
              </button>
              <button
                onClick={startDeleting}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}
              ><DeleteIcon /> Delete
              </button>
            </div>

          </div>
        }
      </div>

      {/* Note preview with preview + edit buttons for desktop interaction handling */}
      <div className={`relative h-50 overflow-hidden blur-effect group dark:bg-slate-700 dark:text-white`}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={markdownStyling}
        >{markDownToText(note.note)}
        </Markdown>

        {/* Interactive buttons for desktop only */}
        {isDesktop &&
          <div className={`absolute opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 inset-0 bg-gradient-to-b to-[#F8F7F7] dark:to-slate-600 from-transparent flex justify-around items-center gap-6 w-full transition-all duration-300`}>
            <button
              onClick={previewNote}
              className={`bg-indigo-200 text-slate-800 p-2 rounded-full active:brightness-80 flex items-center gap-2 w-27 justify-center font-semibold hover:shadow-2xl hover:-translate-y-2 transition-all h-fit`}
            >
              <PreviewIcon />
              Preview
            </button>
            <button
              onClick={editNote}
              className={`bg-orange-400 text-slate-700 p-2 rounded-full active:brightness-80 flex items-center gap-4 w-27 justify-center font-semibold hover:shadow-2xl hover:-translate-y-2 transition-all h-fit`}
            >
              <EditIcon />
              Edit
            </button>
          </div>}

      </div>

      {/* Note tag and creation date showed in both type of devices */}
      <div className={`flex justify-between items-center`}>
        <p className={`bg-indigo-300 max-w-1/3 truncate px-2.5 py-2 rounded-full fira-mono`}>{note?.tag}</p>
        <p className={`fira-mono max-w-2/3 flex items-center gap-3`}>
          <CalendarIcon className={`scale-[1.5]`} />
          {calcDateTime(note?.created_at)}
        </p>
      </div>

    </div>
  );
}