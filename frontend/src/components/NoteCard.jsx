import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownStyling, markDownToText } from "../assets/MarkdownStyling";
import { useEffect, useRef, useState } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";

import PreviewIcon from '../assets/PreviewIcon';
import EditIcon from '../assets/EditIcon';
import ThreeDotIcon from '../assets/ThreeDotIcon.jsx';

export default function NoteCard({ note, setPreviewableContent, setEditableContent, setShowPreview, setShowForm }) {
  const menuRef = useRef(null);

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

  return (
    <div className={`relative flex flex-col gap-7 px-3 py-4 rounded-lg shadow-xl bg-amber-100/20 dark:bg-slate-700 dark:text-white hover:scale-105 transition-all duration-300`}>

      {/* Title + 3 dot menu section */}
      <div className={`relative items-center font-bold cal-sans text-xl md:text-3xl flex justify-between`}>
        <h2 className={`w-full truncate`}>{note.title ? note.title : 'Untitled'}</h2>

        {/* Menu active in mobile or tablet */}
        {(isMobile || isTablet) &&
          <div ref={menuRef}>
            <button
              onClick={() => setShowMenu(prev => !prev)}
              className={`p-1.5 bg-slate-300 rounded-full w-fit`}
            >
              <ThreeDotIcon />
            </button>
            <div className={`absolute ${showMenu ? 'opacity-100 border border-slate-300 max-h-40' : 'opacity-0 max-h-0'} overflow-y-hidden z-10 right-0 top-10 flex flex-col divide-y divide-slate-300 bg-amber-50 rounded-lg shadow-lg transition-all duration-200`}>
              <button
                onClick={() => setShowMenu(false)}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}>
                <PreviewIcon />
                Preview
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className={`flex gap-3 text-sm p-4 active:bg-amber-100 items-center`}>
                <EditIcon />
                Edit
              </button>
            </div>
          </div>
        }
      </div>

      {/* Note preview with preview + edit buttons */}
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

      {/* Note tag and creation date */}
      <div className={`flex justify-between items-center`}>
        <p className={`bg-indigo-300 max-w-1/2 truncate p-1.5 rounded-full fira-mono`}>{note?.tag}</p>
        {/* <p className={`fira-mono max-w-1/2`}>{new Date(note.created_at?.replace('Z', '+06:00')).toISOString()}</p> */}
        <p className={`fira-mono max-w-1/2`}>{note?.created_at}</p>
      </div>
    </div>
  );
}