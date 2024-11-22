import React from 'react'
import { useNavigate } from 'react-router-dom';
import style from './TopBar2.module.css'
import homeIcon from '../../pic/icons/home.svg'
import logoIcon from '../../pic/icons/logo-cat.svg'
import userAvatar from '../../pic/icons/user.svg'

export default function TopBar() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={style.container}>
      <img src={homeIcon} className={style.search} onClick={handleGoBack} alt="home" />
      <img src={logoIcon} className={style.logoCat} alt="logo" />
      <img src={userAvatar} className={style.userAvatar} alt='头像缺失' />
    </div>
  )
}
