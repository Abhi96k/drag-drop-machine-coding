import { useEffect, useRef } from "react";
import Note from "./Note";
import React from "react";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const noteRefs = useRef({}); // store refs by note.id

  // Initialize positions
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

  // Drag handling
  const handleDragStart = (id, e) => {
    e.preventDefault();

    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      // Move note visually
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;

      // Check overlap while dragging
      handleForOverlap(id, newX, newY);
    };

    const handleMouseUp = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, position: { x: newX, y: newY } } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // 🔥 New function: Detect overlap
    const handleForOverlap = (draggedId, x, y) => {
      const draggedEl = noteRefs.current[draggedId].current;
      const draggedRect = draggedEl.getBoundingClientRect();

      notes.forEach((note) => {
        if (note.id === draggedId) return; // skip itself

        const otherEl = noteRefs.current[note.id]?.current;
        if (!otherEl) return;

        const otherRect = otherEl.getBoundingClientRect();

        const isOverlapping =
          draggedRect.left < otherRect.right &&
          draggedRect.right > otherRect.left &&
          draggedRect.top < otherRect.bottom &&
          draggedRect.bottom > otherRect.top;

        if (isOverlapping) {
          // Example effect: highlight overlap
          otherEl.style.border = "2px solid red";
          draggedEl.style.border = "2px solid red";
        } else {
          otherEl.style.border = "1px solid black";
          draggedEl.style.border = "1px solid black";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
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
          onMouseDown={(e) => handleDragStart(note.id, e)}
        />
      ))}
    </div>
  );
};

export default Notes;
