import React from 'react';
import './MainLayout.css';
import ItemsBlock from './ItemsBlock';
import FrameBlock from './FrameBlock';
import SettingsBlock from './SettingsBlock';

const MainLayout = () => {
  return (
    <div className="main-layout">
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

export default MainLayout;
