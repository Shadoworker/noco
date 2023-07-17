import React, { useState, useRef, useEffect} from 'react';

const SortableContainer = () => {
  const [sortableItems, setSortableItems] = useState([]);
  const [hoveringIndex, setHoveringIndex] = useState(null);

  const resizableHandlerRef = useRef(null);


  
  const handleResizeMouseDown = (e, index) => {
    e.preventDefault();
    const element = resizableHandlerRef.current.parentNode;
  
    const initResize = (e)=> {
      e.preventDefault();
      window.addEventListener('mousemove', Resize, false);
      window.addEventListener('mouseup', stopResize, false);
    }
    const Resize = (e)=> {
      element.style.width = (e.clientX - element.getBoundingClientRect().left - 20) + 'px';
      element.style.height = (e.clientY - element.getBoundingClientRect().top - 20) + 'px';
    }
    const stopResize = (e)=> {
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }

    initResize(e);

  };

  const getHandler = (item) =>
  {
    return item.querySelector('.resizable-handler');
  }

  useEffect(() => {
    const sortableItems = document.querySelectorAll('.sortable-item');
    sortableItems.forEach((item) => {
      const resizer = getHandler(item);
      resizer.addEventListener('mousedown', (e) => handleResizeMouseDown(e));
    });
  }, []);


  const handleFrameDragOver = (e) => {
    e.preventDefault();
  };

  const handleFrameDrop = (e) => {
    e.preventDefault();

    // if (sortableItems.length > 0) 
    {
      const data = e.dataTransfer.getData('text/plain');
      var clonedElementData = document.getElementById(data);
      if(clonedElementData && !clonedElementData.classList.contains("sortable-item"))
      {
        const clonedElement = clonedElementData.cloneNode(true);
        clonedElement.setAttribute('draggable', 'false');
        clonedElement.setAttribute('id', `sortable-item-${sortableItems.length + 1}`);
        clonedElement.classList.add('sortable-item');

        setSortableItems((prevItems) => [...prevItems, clonedElement]);
 
      }

    }
  };

  const handleSortItemDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    
    setHoveringIndex(index);

  };

  const handleSortItemDragOver = (e) => {
    e.preventDefault();
  };

  
  const swapElements = (_array, index1, index2) => {
      _array[index1] = _array.splice(index2, 1, _array[index1])[0];
  };

  const handleSortItemDrop = (e, index) => {
    e.preventDefault();
    console.log(hoveringIndex)
    if(hoveringIndex != null)
    {
      const data = e.dataTransfer.getData('text/plain');
      // const draggedElement = document.getElementById(data);
      var newSortableItems = [...sortableItems];
      swapElements(newSortableItems, hoveringIndex, index);
      setSortableItems(newSortableItems);
  
      setHoveringIndex(null);

    }




  };

  return (
    <div className="block">
      <div className="sortable-container" id="sortable-container" 
        onDragOver={handleFrameDragOver} 
        onDrop={handleFrameDrop}>
        {sortableItems.map((item, index) => (
          <div
            id={item.getAttribute("id")}
            key={index}
            className={item.classList.value}
            draggable="true"
            onDragStart={(e) => handleSortItemDragStart(e, index)}
            onDragOver={handleSortItemDragOver}
            onDrop={(e) => handleSortItemDrop(e, index)}
          >
            {item.textContent}

            <div className="resizable-handler" ref={resizableHandlerRef}></div>

          </div>
        ))}
      </div>
    </div>
  );
};

  export default SortableContainer;