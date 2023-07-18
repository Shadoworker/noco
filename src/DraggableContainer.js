import React, { useState, useRef } from 'react';

const DraggableContainer = () => {
    const [draggedElement, setDraggedElement] = useState(null);
    const dragPreviewRef = useRef(null);
  
    const handleItemDragStart = (event) => {
      setDraggedElement(event.target.cloneNode(true));
      event.dataTransfer.setData('text/plain', event.target.id);
      // dragPreviewRef.current.appendChild(draggedElement);
    };
  
    const handleItemDragEnd = () => {
      // dragPreviewRef.current.removeChild(draggedElement);
    };
  
    return (
      <div className="block">
        <h6>Items</h6>
        <div className="draggable-container">
          <div id="draggable-item-1" className="draggable-item" draggable="true" onDragStart={handleItemDragStart} onDragEnd={handleItemDragEnd}>
            Element 1
          </div>
          <div id="draggable-item-2" className="draggable-item draggable2" draggable="true" onDragStart={handleItemDragStart} onDragEnd={handleItemDragEnd}>
            Element 2
          </div>
          {/* Add more draggable items here */}
        </div>
        <div className="drag-preview" ref={dragPreviewRef}></div>
      </div>
    );
  };

  export default DraggableContainer;