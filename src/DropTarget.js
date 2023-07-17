import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const DropTarget = () => {
  return (
    <Droppable droppableId="boxList">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            width: '300px',
            height: '300px',
            border: snapshot.isDraggingOver ? '2px dashed black' : '2px solid black',
            backgroundColor: 'lightgray',
          }}
        >
          {/* Render the dropped elements here */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropTarget;
