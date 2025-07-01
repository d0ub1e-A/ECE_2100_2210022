import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useContext, useEffect, useRef, useState } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { markdownStyling, markDownToText } from "../../assets/util/UtilMarkdownStyling.jsx";
import { api } from "../../assets/util/UtilApi.js";
import { calcDateTime } from "../../assets/util/UtilCalcDateTime.js";
import { UserContext } from "../../pages/layout/LayoutUser.jsx";

import PreviewIcon from '../../assets/icon/IconPreview.jsx';
import EditIcon from '../../assets/icon/IconEdit.jsx';
import ThreeDotIcon from '../../assets/icon/IconThreeDot.jsx';
import DeleteIcon from '../../assets/icon/IconDelete.jsx';
import CalendarIcon from '../../assets/icon/IconCalendar.jsx'
import PinIcon from '../../assets/icon/IconPin.jsx';

export default function NoteCard({ note, setPreviewableContent, setEditableContent, setShowPreview, setShowForm }) {
  const menuRef = useRef(null);
  const { setRefetch } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const closeMenu = e =>
      (menuRef.current && !menuRef.current.contains(e.target)) && setShowMenu(false);

    window.addEventListener('mousedown', closeMenu);

    return () => window.removeEventListener('mousedown', closeMenu);
  }, []);

  function editNote() {
    setEditableContent(note);
    setShowForm(true);
  }

  function previewNote() {
    setPreviewableContent(note);
    setShowPreview(true);
  }

  async function deleteNote(id) {
    try {
      const deleteRes = await api.delete(`/notes/${id}`);

      deleteRes.status === 200 && setRefetch(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  async function pinNotes(id) {
    try {
      const pinningRes = await api.patch(`/notes/${id}/pin`);

      pinningRes.status === 200 && setRefetch(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`relative flex flex-col gap-7 px-3 py-4 rounded-lg shadow-xl bg-amber-100/20 dark:bg-slate-700 dark:text-white hover:scale-105 transition-all duration-300`}>

      {/* Title + 3 dot menu section for touch screen devices */}
      <div className={`relative items-center font-bold cal-sans text-xl md:text-3xl flex justify-between`}>
        <button
          onClick={() => pinNotes(note.note_id)}
          className={`hover:scale-105 transition-all absolute bottom-full -left-6`}
        ><PinIcon className={`${note.pinned ? '-rotate-45' : 'rotate-0'}`} />
        </button>
        <h2 className={`w-full truncate`}>{note?.title}</h2>

        {isDesktop &&
          <button
            onClick={() => deleteNote(note.note_id)}
            className={`p-1.5 rounded-full hover:border hover:border-red-300 hover:bg-slate-300/80 transition-all duration-300`}
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
                onClick={() => deleteNote(note.note_id)}
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
              className={`bg-indigo-200 text-slate-800 p-2 rounded-full active:brightness-80 flex items-center gap-2 w-27 justify-center font-semibold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-fit`}
            >
              <PreviewIcon />
              Preview
            </button>
            <button
              onClick={editNote}
              className={`bg-orange-400 text-slate-700 p-2 rounded-full active:brightness-80 flex items-center gap-4 w-27 justify-center font-semibold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-fit`}
            >
              <EditIcon />
              Edit
            </button>
          </div>}

      </div>

      {/* Note tag and creation date showed in both type of devices */}
      <div className={`flex justify-between items-center`}>
        <p className={`bg-indigo-300 max-w-1/2 truncate p-1.5 rounded-full fira-mono`}>{note?.tag}</p>
        <p className={`fira-mono max-w-1/2 flex items-center gap-3`}>
          <CalendarIcon className={`scale-[1.5]`} />
          {calcDateTime(note?.created_at)}
        </p>
      </div>

    </div>
  );
}