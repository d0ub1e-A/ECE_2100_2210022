import NoteCard from "../card/CardNote";

export default function PinnedNoteContainerUI({pinnedNotes, setPreviewableContent, setEditableContent, setShowPreview, setShowForm}) {
  return (
    <section className={`relative`}>
      <div className={`pt-10 pb-16 px-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5`}>
      {pinnedNotes?.map((note, index) =>
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