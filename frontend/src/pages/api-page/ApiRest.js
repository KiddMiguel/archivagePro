import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftBarAPI from './LeftBarAPI';

const ApiRest = () => {

  return (
    <div style={{ display: 'flex' }}>
      <LeftBarAPI />
      <div style={{ flexGrow: 1 }}>

        {/* <HeaderAPI /> Uncomment if you add a header */}
        <div style={{ padding: '20px', textAlign : "left" }}>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ApiRest;
