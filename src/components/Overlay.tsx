import Logo from '@/images/light_theme.svg';
import React from 'react';

const Overlay = ({}) => {
  return (
    <div className="fixed w-full h-full flex align-middle items-center">
      <div className="text-2xl  m-auto">
        <img src={Logo} alt="Logo" className="compsocLogo p-5" />
      </div>
    </div>
  );
};

export default Overlay;
