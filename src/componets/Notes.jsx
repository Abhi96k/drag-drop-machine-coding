import { useEffect, useRef } from "react";
import Note from "./Note";
import React from "react";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const noteRefs = useRef([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) return savedNote;

      const position = determineNewPosition();
      return { ...note, position };
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, []);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 150;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDargeStart = (id, e) => {
    const noteRef = noteRefs.current[id].current;
  };

  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          content={note}
          initialPos={note.position}
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = React.createRef())
          }
          onMouseDown={() => {
            handleDargeStart(note.id, e);
          }}
        />
      ))}
    </div>
  );
};

export default Notes;
