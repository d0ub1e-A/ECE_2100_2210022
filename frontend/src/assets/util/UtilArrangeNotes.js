export function arrangeNotes(notes) {
  const tags = [...new Set(notes.map(note => note.tag))];
  const categorizedNotes = tags.map(tag => ({
    tag: tag,
    notes: notes.filter(note => note.tag === tag),
  }));

  return categorizedNotes;
}