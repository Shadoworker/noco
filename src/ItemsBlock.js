import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faBox, faImage, faTextHeight, faTextSlash } from '@fortawesome/free-solid-svg-icons';
import './ItemsBlock.css';
import { useState } from 'react';
import { useEffect } from 'react';
import DraggableContainer from './DraggableContainer';

const ItemsBlock = () => {


    const draggableContainerRef = useRef(null);


    const [draggableContainer, setDraggableContainer] = useState(null);
    const [draggableItems, setDraggableItems] = useState(null);
    //   const draggableContainer = document.querySelector(".draggable-container");
    //   const draggableItems = draggableContainer.querySelectorAll(".draggable-item");

    useEffect(()=>{

        setDraggableContainer(draggableContainerRef.current);
        setTimeout(() => { 
            setDraggableItems(draggableContainerRef.current.children.length);
    
            console.log(draggableContainerRef.current.children.length)
        }, 100);
       

    }, [])


    return (

        <div>      {/*<div className='items-block'>
            <div className="item">
        <FontAwesomeIcon icon={faFont} />
        <span>Text</span>
      </div>
      <div className="item">
        <FontAwesomeIcon icon={faBox} />
        <span>Box</span>
      </div>
      <div className="item">
        <FontAwesomeIcon icon={faImage} />
        <span>Img</span>
      </div> 

        </div>*/}
            <DraggableContainer />
        
        </div>
   
    );
};

export default ItemsBlock;
