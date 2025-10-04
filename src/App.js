import { useState } from "react";
import "./styles.css";

import { notesData } from "./Data/notes.js";
import Notes from "./componets/Notes.jsx";

export default function App() {
  const [notes, setNotes] = useState(notesData);

  return (
    <div className="App">
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}
