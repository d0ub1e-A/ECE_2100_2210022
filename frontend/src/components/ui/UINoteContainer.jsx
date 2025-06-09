import { pickAColor } from '../../assets/util/UtilPickRandomColor';

import NoteCard from '../card/CardNote';

export default function NoteContainerUI({groupedNotes, setPreviewableContent, setEditableContent, setShowPreview, setShowForm}) {
  const thisTag = groupedNotes?.tag;
  const thisNotes = groupedNotes?.notes;
  const randomColor = pickAColor();
  
  return(
    <section className={`relative`}>
      <p className={`${thisTag === 'untagged' ? 'bg-red-200' : randomColor}  sticky top-3 z-10 mx-[31.5px] max-w-fit truncate p-1.5 rounded-full fira-mono`}>{thisTag}</p>
      <div className={`pt-10 pb-16 px-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5`}>
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