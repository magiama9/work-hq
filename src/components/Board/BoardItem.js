import React, { useRef } from "react";
import { useDrag } from "react-dnd";

// This should be split into a separate component
// Defines each item on the board
const BoardItem = ({ id, children }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;

  
  // drag(ref);
  return (
    <div ref={drag} style={{ opacity }}>
      {children}
    </div>
  );
};

export default BoardItem;
