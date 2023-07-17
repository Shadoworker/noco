import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Box = ({ name, index }) => {
  return (
    <Draggable draggableId={name} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            opacity: snapshot.isDragging ? 0.5 : 1,
            ...provided.draggableProps.style,
            border: '1px solid black',
            padding: '0.5rem',
          }}
        >
          {name}
        </div>
      )}
    </Draggable>
  );
};

export default Box;
