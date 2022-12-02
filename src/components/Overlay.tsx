import Logo from '@/images/light_theme.svg';
import React from 'react';

const Overlay = ({}) => {
  return (
    <div className="fixed w-full h-full flex align-middle items-center">
      <div className="text-2xl bottom-0 right-0 fixed">
        <img src={Logo} alt="Logo" className="p-5 bg-white bg-opacity-75 rounded-tl-2xl h-40" />
      </div>
    </div>
  );
};

export default Overlay;
