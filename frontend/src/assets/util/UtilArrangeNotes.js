export function arrangeNotes(notes) {
  const tags = [...new Set(notes.map(note => note.tag))];console.log(tags);
  const categorizedNotes = tags.map(tag => ({
    tag: tag,
    notes: notes.filter(note => note.tag === tag && !note.pinned),
  }));

  return categorizedNotes;
}

export function getPinnedNotes(notes) {
  return notes.filter(note => note.pinned);
}