import React from 'react'
import style from './TopBar.module.css'
import searchIcon from '../../pic/icons/search.svg'
import logoIcon from '../../pic/icons/logo-cat.svg'
import userAvatar from '../../pic/icons/user.svg'

export default function TopBar() {
  return (
    <div className = {style.container}>
        <img src = {searchIcon} className={style.search}></img>
        <img src = {logoIcon} className={style.logoCat}></img>
        <img src = {userAvatar} className={style.userAvatar} alt='头像缺失'></img>
    </div>
  )
}
