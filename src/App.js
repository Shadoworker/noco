import React, { useState, useRef } from 'react';
import './App.css'; // Create an App.css file and copy the CSS styles from the original code into it
import DraggableContainer from './DraggableContainer';
import SortableContainer from './SortableContainer';
 


const App = () => {
  return (
    <div className="app">
      <DraggableContainer />
      <SortableContainer />
    </div>
  );
};

export default App;
