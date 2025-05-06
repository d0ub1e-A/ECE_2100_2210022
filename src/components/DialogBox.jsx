import { useEffect, useState } from "react";

export default function DialogBox({showDialog, setShowDialog, setShowForm}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showDialog);

    const handleEscape = e => (e.key === 'Escape' && show) && setShowDialog(false);

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [showDialog, show]);
  
  function discard() {
    setShowDialog(false);
    setShowForm(false);
  }
  
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-7 py-5 rounded-lg shadow-lg bg-slate-100 ${show ? 'scale-100 skew-0' : 'scale-0 skew-12'} transition-all duration-400 z-60`}>
      <p className={`text-sm sm:text-lg mb-5 text-center`}>Discard Unsaved Changes?</p>
      <div className={`flex gap-2 justify-between`}>
        <button
          onClick={() => setShowDialog(false)}
          className={`text-sm sm:text-lg border border-slate-400 p-2 rounded-md shadow-md active:brightness-110 bg-purple-100`}>
          Cancel
        </button>
        <button
          onClick={discard}
          className={`text-sm sm:text-lg border border-slate-400 p-2 rounded-md shadow-md active:brightness-110 bg-red-100`}>
          Discard
        </button>
      </div>
    </div>
  );
}