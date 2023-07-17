import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { DragDropContext } from 'react-beautiful-dnd';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(  
<DragDropContext>
  <App />
</DragDropContext>
);
 
