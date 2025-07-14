export function arrangeNotes(notes) {
  const tags = [...new Set(notes.map(note => note.tag))];
  const categorizedNotes = tags.map(tag => ({
    tag: tag,
    notes: notes.filter(note => note.tag === tag && !note.pinned),
  }));
  const allTaggedNotes = categorizedNotes.filter(notes => notes.tag !== 'untagged');

  return allTaggedNotes;
}

export function getPinnedNotes(notes) {
  return notes.filter(note => note.pinned);
}

export function getUntaggedNotes(notes) {
  return notes.filter(note => note.tag === 'untagged');
}