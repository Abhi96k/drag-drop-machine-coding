import { forwardRef } from "react";

const Note = forwardRef(({ content, initialPos, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="note"
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        width: "200px",
        cursor: "move",
        padding: "8px",
        backgroundColor: "lightgoldenrodyellow",
        borderRadius: "4px",
      }}
      {...props}
    >
      📍{content.text}
    </div>
  );
});

export default Note;
