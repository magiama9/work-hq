import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

// This should be split into a separate component
const BoardColumn = ({ status, changeTaskStatus, children }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'card', // Tells it what type of thing we can drop in
    drop(item) {
      changeTaskStatus(item.id, status); // Changes the status to the status of the column
      return { columnStatus: status }; // Returns the status of the dropped column
    }
  });
  drop(ref);

  return <div ref={ref}> {children}</div>;
};

export default BoardColumn;
