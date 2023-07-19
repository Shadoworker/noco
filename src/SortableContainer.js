import { element } from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';


const SortItemActionType = {

  PREV : -1,
  INSIDE : 0,
  NEXT : 1,
  NONE : null 

}

const SortableContainer = () => {
  const [sortableItems, setSortableItems] = useState([]);
  const [sortableItemsCounter, setSortableItemsCounter] = useState(0);
  const [hoveringIndex, setHoveringIndex] = useState(null);
  const [hoveringItem, setHoveringItem] = useState(null);
  const [sortItemActionType, setSortItemActionType] = useState(SortItemActionType.NONE);

  const sortableContainerRef = useRef(null);

 
  useEffect(() => {
    
 
    // let arr = [
    //   {id:"1", path:"#/1", children : []},
    //   {id:"2", path:"#/2", 
    //     children : 
    //     [
    //       {id:"3", path:"#/2/3", children : [
    //         {id:"5", path:"#/2/3/5", children : []}
    //       ]},
    //     ]
    //   },
    // ];


    // removeItemFromPath(arr, {id:"5", path:"#/2/3/5", children : []})

    // placeItemFromItemPath(arr, 
    //   {id:"2", path:"#/2", 
    //     children : 
    //     [
    //       {id:"3", path:"#/2/3", children : [
    //         {id:"5", path:"#/2/3/5", children : []}
    //       ]},
    //     ]
    //   }, 
        
    //   {id:"5", path:"#/2/3/5", children : []},
    //   false 
        
    //     )

    
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
        clonedElement.classList.add('sortable-item');

        var elementId = `sortable-item-${sortableItemsCounter + 1}`;
        var newElement = {
            tag : clonedElement.nodeName.toLowerCase(),
            path :"#/"+elementId, // The element path
            id: elementId, 
            classList: clonedElement.classList.value, 
            style: clonedElement.style.cssText,
            children : [
              // {
              //   tag : clonedElement.nodeName.toLowerCase(), 
              //   id: elementId+"-1", 
              //   classList: clonedElement.classList.value, 
              //   style: clonedElement.style.cssText,
              //   children : [
              //     {
              //       tag : clonedElement.nodeName.toLowerCase(), 
              //       id: elementId+"-1-1", 
              //       classList: clonedElement.classList.value, 
              //       style: clonedElement.style.cssText,
              //       children : []
              //     }
              //   ]
              // },
              // {
              //   tag : clonedElement.nodeName.toLowerCase(), 
              //   id: elementId+"-1", 
              //   classList: clonedElement.classList.value, 
              //   style: clonedElement.style.cssText,
              //   children : []
              // }
            ]
          }

        setSortableItems((prevItems) => [...prevItems, newElement]);
        setSortableItemsCounter((prev) => prev + 1);
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

  const handleSortItemDragStart = (e, index, item) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', e.target.id);
    var element = e.target;
    var container = sortableContainerRef.current; // re-check
    container.classList.add("slist")
    setHoveringIndex(index);
    setHoveringItem(item);

    let items = container.querySelectorAll(".sortable-item"), current = element;
    for (let it of items) {
      if (it != current) { it.classList.add("hint"); }
    }

  };

  const handleSortItemDragOver = (e, id) => {
    e.preventDefault();
    handleSortItemActionType(e, id);
  };

  const handleSortItemActionType = (e, id) => {
    
    const hoveredElement = e.target;
    const hoveredElementBCR = hoveredElement.getBoundingClientRect();
    
    const mouseY = e.clientY;
  
    // Calculate the center and the third section of the div
    const partial = (hoveredElementBCR.height / 4);
    const center = hoveredElementBCR.top + partial;
    const thirdSection = hoveredElementBCR.top + (partial * 3);

    if(hoveringItem.id != id) // Dont consider the same element
    {
      if (mouseY < center) 
      {
        if(!hoveredElement.classList.contains("hovered-top"))
            hoveredElement.classList.add("hovered-top");
          
          setSortItemActionType(SortItemActionType.PREV);

          hoveredElement.classList.remove("hovered-bottom");
      } 
      else if (mouseY > thirdSection) 
      {
        if(!hoveredElement.classList.contains("hovered-bottom"))
            hoveredElement.classList.add("hovered-bottom");

          setSortItemActionType(SortItemActionType.NEXT);

          hoveredElement.classList.remove("hovered-top");

      } else 
      {
        hoveredElement.classList.remove("hovered-top");
        hoveredElement.classList.remove("hovered-bottom");

        setSortItemActionType(SortItemActionType.INSIDE);

      }
    }
    else
    {
      setSortItemActionType(SortItemActionType.NONE);
    }

  }

  const handleSortItemDragEnter = (e) => {
    e.preventDefault();
    var element = e.target;

    element.classList.add("active");
  };
  

  const handleSortItemDragLeave = (e) => {
    e.preventDefault();
    var element = e.target;

    element.classList.remove("active");
    element.classList.add("hovered-top");
    element.classList.remove("hovered-top");
    
  };


  const handleSortItemDrop = (e, index, item) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (hoveringIndex != null) {
      var newSortableItems = [...sortableItems];

      // Get SortItemActionType
      switch(sortItemActionType)
      {
        case SortItemActionType.PREV: // before the target
          var itemsListAfterRemove = removeItemFromPath(sortableItems, hoveringItem);
          var itemsListAfterPlacing = placeItemFromItemPath(itemsListAfterRemove, item, hoveringItem, sortItemActionType);

          setSortableItems(itemsListAfterPlacing);

        break; 

        case SortItemActionType.NEXT: // after the target
          var itemsListAfterRemove = removeItemFromPath(sortableItems, hoveringItem);
          var itemsListAfterPlacing = placeItemFromItemPath(itemsListAfterRemove, item, hoveringItem, sortItemActionType);

          setSortableItems(itemsListAfterPlacing);

        break; 

        case SortItemActionType.INSIDE: // INSIDE : as child
          var itemsListAfterRemove = removeItemFromPath(sortableItems, hoveringItem);
          var itemsListAfterPlacing = placeItemFromItemPath(itemsListAfterRemove, item, hoveringItem, sortItemActionType);

          setSortableItems(itemsListAfterPlacing);

        break; 

        default:

          swapElements(newSortableItems, hoveringIndex, index);
          setSortableItems(newSortableItems);
    
        break;
      }

     
      setHoveringIndex(null);

      // sorting styling
      var container = sortableContainerRef.current; // re-check
      let items = container.querySelectorAll(".sortable-item");
      for (let it of items) {
        it.classList.remove("hint")
        it.classList.remove("active")
      }

    }

    setHoveringItem(null);

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

  // @ Remove an item from its current path in order to move it elsewhere
  const removeItemFromPath = (_arr, item) =>{ 

    var path = item.path;
    var nodes = path.split("/");
    
    var _sortableItems = [..._arr];
    var currentParent = _sortableItems;
    var nextParent = currentParent;
   
    for (let i = 1; i < nodes.length; i++) // dont consider the root (#/)
    { 
      const node = nodes[i];
      var item = currentParent.find(e=>e.id == node);

      if(i == nodes.length-1) // Then remove that item from its parent
      {
         currentParent.splice(currentParent.indexOf(item), 1);
      }
      else
      {
        nextParent = item.children;
      }
      
      // set new parent
      currentParent = nextParent;
    
    }

    console.log(_sortableItems);
    return _sortableItems;

  }

  const getParentPath = (itemPath) =>{

    const lastSlashIndex = itemPath.lastIndexOf('/');

    // Extract the substring before the last slash
    const path = itemPath.slice(0, lastSlashIndex);

    return path;
  }

  const placeItemFromItemPath = (_arr, item, _sourceItem, _type = SortItemActionType.PREV) =>{ 

    var path = item.path;
    var nodes = path.split("/");
    
    var _sortableItems = [..._arr];
    var currentParent = _sortableItems;
    var targetParent = currentParent;
    for (let i = 1; i < nodes.length; i++) // dont consider the root (#/)
    { 
      const node = nodes[i];
      var item = currentParent.find(e=>e.id == node);
      
      targetParent = currentParent;
      var nextParent = item ? item.children : currentParent;
      // set new parent
      currentParent = nextParent;

      if(i == nodes.length-1) // Set item positionning
      {

        var targetIndex = targetParent.indexOf(item);
        var targetParentPath = getParentPath(item.path);

        if(_type != SortItemActionType.INSIDE)
        {
          placeItemAbowOrBelow(targetParent, targetParentPath, _sourceItem, targetIndex, _type);
        }
        else
        {
          targetParentPath = item.path;
          targetIndex = item.children.length;

          placeItemInside(item.children, targetParentPath, _sourceItem, targetIndex, _type);
        }

      }
    
    }
 
    console.log(_sortableItems);

    return _sortableItems;

  }

  const placeItemAbowOrBelow = (_arr, _targetPath, _source, _targetIndex, _type = SortItemActionType.PREV ) =>{


    var _sourceIndex = _arr.indexOf(_source);

    if (
      (_sourceIndex != -1 && _sourceIndex < 0) ||
      (_sourceIndex != -1 && _sourceIndex >= _arr.length) ||
      _targetIndex < 0 ||
      _targetIndex >= _arr.length ||
      _sourceIndex === _targetIndex
    ) {
      console.error('Invalid source or target index.');
      return _arr;
    }

    var initialArray = [..._arr];

    var movedElement = _source; // The movedElement is initially removed from its parent with the removeItemFromPath

    // Set new path
    movedElement.path = _targetPath+"/"+movedElement.id;

    // Find the updated index of the target element
    var newTargetIndex = _arr.indexOf(initialArray[_targetIndex]);
  
    if(_type == SortItemActionType.NEXT) 
      newTargetIndex = newTargetIndex + 1;

    _arr.splice(newTargetIndex, 0, movedElement);

    return _arr;

  }


  
  const placeItemInside = (_arr, _targetPath, _source, _targetIndex, _type = SortItemActionType.INSIDE ) =>{

    var initialArray = [..._arr];

    var movedElement = _source; // The movedElement is initially removed from its parent with the removeItemFromPath

    // Set new path
    movedElement.path = _targetPath+"/"+movedElement.id;

    // Find the updated index of the target element
    // var newTargetIndex = _arr.indexOf(initialArray[_targetIndex]);
    
    _arr.push(movedElement);

    return _arr;

  }

  // END UTILITIES --------------------------------------------



  const sortableRenderer = (item, index) =>{

      return (
        <div
            id={item.id}
            key={index}
            className={item.classList}
            style={setStyle(item.style)}
            draggable="true"
            onMouseDown={(e) => handleSortItemMouseDown(e, index)}
            onDragStart={(e) => handleSortItemDragStart(e, index, item)}
            onDragOver={(e) => handleSortItemDragOver(e, item.id)}
            onDragEnter={handleSortItemDragEnter}
            onDragLeave={handleSortItemDragLeave}
            onDrop={(e) => handleSortItemDrop(e, index, item)}

          >

            {item.id}

            {item.children.map((_item, _index) => (
              sortableRenderer(_item, _index)
            ))}

            <div className="resizable-handler" onMouseDown={(e) => handleResizeMouseDown(e, index)} ></div>

          </div>
      )

  }

  return (
    <div className="block">
      <div className="sortable-container" ref={sortableContainerRef} id="sortable-container"
        onDragOver={handleFrameDragOver}
        onDrop={handleFrameDrop}>
        {sortableItems.map((item, index) => (
          sortableRenderer(item, index)
        ))}
      </div>
    </div>
  );
};

export default SortableContainer;