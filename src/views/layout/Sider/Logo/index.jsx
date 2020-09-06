import React from "react";
import img_logo from "@/assets/images/logo-p.png";
import img_icon from "@/assets/images/logo-icon-p.png";
import './index.less';

const Logo = (props) => {
  const {
    collapsed
  } = props;

  return (
    <div className='logo'>
      <img className={collapsed ? 'icon' : ''} src={collapsed ? img_icon : img_logo} alt="logo" />
    </div>
  );
};

export default Logo;
