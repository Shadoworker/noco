import React from 'react';
import './ThunkableLayout.css';
import ItemsBlock from './ItemsBlock';
import FrameBlock from './FrameBlock';
import SettingsBlock from './SettingsBlock';

const ThunkableLayout = () => {
  return (
    <div className="thunkable-layout">
      <div className="sidebar">
        <ItemsBlock />
      </div>
      <div className="main-content">
        <FrameBlock />
        <SettingsBlock />
      </div>
    </div>
  );
};

export default ThunkableLayout;
