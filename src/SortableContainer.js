import React, { useState, useRef, useEffect } from 'react';

const SortableContainer = () => {
  const [sortableItems, setSortableItems] = useState([]);
  const [hoveringIndex, setHoveringIndex] = useState(null);

  const sortableContainerRef = useRef(null);



  const getElement = (index) => {

    return sortableContainerRef.current.children["sortable-item-" + (index + 1)];

  }

  useEffect(() => {

  }, []);


  // DRAG N DROP ZONE ---------------------------------------------
  const handleFrameDragOver = (e) => {
    e.preventDefault();
  };

  const handleFrameDrop = (e) => {
    e.preventDefault();

    // if (sortableItems.length > 0) 
    {
      const data = e.dataTransfer.getData('text/plain');
      var clonedElementData = document.getElementById(data);
      if (clonedElementData && !clonedElementData.classList.contains("sortable-item")) {
        const clonedElement = clonedElementData.cloneNode(true);
        clonedElement.setAttribute('draggable', 'false');
        clonedElement.setAttribute('id', `sortable-item-${sortableItems.length + 1}`);
        clonedElement.classList.add('sortable-item');

        var elementId = `sortable-item-${sortableItems.length + 1}`;
        var newElement = {tag : clonedElement.nodeName.toLowerCase(), id: elementId, classList: clonedElement.classList.value, style: clonedElement.style.cssText}

        setSortableItems((prevItems) => [...prevItems, newElement]);

      }

    }
  };


  // END DRAG N DROP ZONE ---------------------------------------------


  const handleSortItemMouseDown = (e, index) => {

    var element = e.target;
    // console.log(index)    
    // console.log(element.getAttribute("id"))    
  };


  // SORT ZONE ---------------------------------------

  const handleSortItemDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    var element = e.target;
    var container = sortableContainerRef.current; // re-check
    container.classList.add("slist")
    setHoveringIndex(index);

    let items = container.querySelectorAll(".sortable-item"), current = element;
    for (let it of items) {
      if (it != current) { it.classList.add("hint"); }
    }

  };

  const handleSortItemDragOver = (e) => {
    e.preventDefault();
  };

  const handleSortItemDragEnter = (e) => {
    e.preventDefault();
    var element = e.target;

    element.classList.add("active");
  };

  const handleSortItemDragLeave = (e) => {
    e.preventDefault();
    var element = e.target;

    element.classList.remove("active");
  };


  const handleSortItemDrop = (e, index) => {
    e.preventDefault();
    console.log(hoveringIndex)
    if (hoveringIndex != null) {
      var newSortableItems = [...sortableItems];
      swapElements(newSortableItems, hoveringIndex, index);
      setSortableItems(newSortableItems);

      setHoveringIndex(null);

      // sorting styling
      var container = sortableContainerRef.current; // re-check
      let items = container.querySelectorAll(".sortable-item");
      for (let it of items) {
        it.classList.remove("hint")
        it.classList.remove("active")
      }

    }


  };

  // END SORT ZONE -------------------------------------------

  // RESIZE ZONE ---------------------------------------------
  const handleResizeMouseDown = (e, index) => {
    e.preventDefault();
    var element = e.target.parentNode;

    const initResize = (e) => {
      e.preventDefault();
      window.addEventListener('mousemove', Resize, false);
      window.addEventListener('mouseup', stopResize, false);
    }

    const Resize = (e) => {
      element.style.width = (e.clientX - element.getBoundingClientRect().left - 20) + 'px';
      element.style.height = (e.clientY - element.getBoundingClientRect().top - 20) + 'px';
    }

    const stopResize = (e) => {

      window.removeEventListener('mousemove', Resize, false);
      window.removeEventListener('mouseup', stopResize, false);

      // Replace item
      var updatedItems = [...sortableItems];
      updatedItems[index].style = element.style.cssText;
      setSortableItems(updatedItems);
    

    }

    initResize(e);

  };

  // END RESIZE ZONE ------------------------------------

  // UTILITIES --------------------------------------------
  const swapElements = (_array, index1, index2) => {
    _array[index1] = _array.splice(index2, 1, _array[index1])[0];
  };

  const convertCSSToReactStyles = (cssString) => {
    const styleObject = {};

    // Split the CSS string by semicolon to get individual styles
    const styles = cssString.split(';');

    // Process each style
    styles.forEach((style) => {
      if (style.trim() !== '') {
        // Split the style by colon to get property and value
        const [property, value] = style.split(':');
        const propertyName = property.trim();
        const propertyValue = value.trim();

        // Convert property name to camelCase
        const camelCaseName = propertyName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        // Add the property to the styleObject
        styleObject[camelCaseName] = propertyValue;
      }
    });

    return styleObject;
  };

  const setStyle = (cssText) => {

    var style = convertCSSToReactStyles(cssText)
    return style;
  }

  // END UTILITIES --------------------------------------------


  return (
    <div className="block">
      <div className="sortable-container" ref={sortableContainerRef} id="sortable-container"
        onDragOver={handleFrameDragOver}
        onDrop={handleFrameDrop}>
        {sortableItems.map((item, index) => (
          <div
            id={item.id}
            key={index}
            className={item.classList}
            style={setStyle(item.style)}
            draggable="true"
            onMouseDown={(e) => handleSortItemMouseDown(e, index)}
            onDragStart={(e) => handleSortItemDragStart(e, index)}
            onDragOver={handleSortItemDragOver}
            onDragEnter={handleSortItemDragEnter}
            onDragLeave={handleSortItemDragLeave}
            onDrop={(e) => handleSortItemDrop(e, index)}

          >

            {item.id}

            <div className="resizable-handler" onMouseDown={(e) => handleResizeMouseDown(e, index)} ></div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SortableContainer;