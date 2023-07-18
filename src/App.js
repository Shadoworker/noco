import React, { useState, useRef } from 'react';
import './App.css'; // Create an App.css file and copy the CSS styles from the original code into it
import DraggableContainer from './DraggableContainer';
import SortableContainer from './SortableContainer';
import ItemsBlock from './ItemsBlock';
import MainLayout from './MainLayout';
 


const App = () => {
  return (
    <div className="noco">
      {/* <ItemsBlock />
      <SortableContainer /> */}
      <MainLayout />
    </div>
  );
};

export default App;
