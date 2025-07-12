import NoteCard from "../card/CardNote";

export default function PinnedNoteContainerUI({pinnedNotes, setPreviewableContent, setEditableContent, setShowPreview, setShowForm}) {
  return (
    <section className={`relative px-10 pt-10`}>
      <div className={`w-full flex flex-wrap justify-start gap-10`}>
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