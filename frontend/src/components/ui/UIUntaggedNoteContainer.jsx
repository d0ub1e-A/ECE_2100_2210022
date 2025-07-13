import NoteCard from "../card/CardNote";

export default function UntaggedNoteContainerUI({untaggedNotes, setPreviewableContent, setEditableContent, setShowPreview, setShowForm}) {
  return(
    <section className={`relative px-10 pt-10`}>
          <p className={`bg-red-200 sticky top-3 z-20 max-w-fit truncate px-2.5 py-2 rounded-full font-[500] fira-mono mb-10`}>untagged</p>
          <div className={`w-full flex flex-wrap justify-start gap-10`}>
            {untaggedNotes?.map((note, index) =>
              <NoteCard
                key={index}
                note={note}
                setPreviewableContent={setPreviewableContent}
                setEditableContent={setEditableContent}
                setShowPreview={setShowPreview}
                setShowForm={setShowForm}
              />
            )}
          </div>
        </section>
  );
}