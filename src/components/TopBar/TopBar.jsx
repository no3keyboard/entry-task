import React from 'react';
import style from './TopBar.module.css';
import searchIcon from '../../pic/icons/search.svg';
import logoIcon from '../../pic/icons/logo-cat.svg';
import userAvatar from '../../pic/icons/user.svg';

export default function TopBar() {

  const openSidebar = (e) => {
    document.getElementById("sidebar").style.width = "75%";
    document.getElementById("main").style.marginLeft = "75%";
  };

  return (
    <div className={style.container}>
      <img src={searchIcon} className={style.search} onClick={openSidebar} alt="Search"></img>
      <img src={logoIcon} className={style.logoCat} alt="Logo"></img>
      <img src={userAvatar} className={style.userAvatar} alt="头像缺失"></img>
    </div>
  );
}
