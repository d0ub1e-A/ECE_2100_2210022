import { pickAColor } from '../../assets/util/UtilPickRandomColor';

import NoteCard from '../card/CardNote';

export default function NoteContainerUI({groupedNotes, setPreviewableContent, setEditableContent, setShowPreview, setShowForm}) {
  const thisTag = groupedNotes?.tag;
  const thisNotes = groupedNotes?.notes;
  const randomColor = pickAColor();
  
  return(
    <section className={`relative px-10 pt-10`}>
      <p className={`${thisTag === 'untagged' ? 'bg-red-200' : randomColor} sticky top-3 z-10 max-w-fit truncate px-2.5 py-2 rounded-full font-[500] fira-mono mb-10`}>{thisTag}</p>
      <div className={`w-full flex flex-wrap justify-start gap-10`}>
        {thisNotes?.map((note, index) =>
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