import Note from "./Note";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} content={note} />
      ))}
    </div>
  );
};

export default Notes;
