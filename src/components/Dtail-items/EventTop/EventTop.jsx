import React from 'react'
import { useLocation } from 'react-router-dom'
import style from './EventTop.module.css'

export default function eventTop(props) {

  const {param} = props //取参
  
  const eventData = param;

  return (
    <div className={style.eventTop}>
      <div className={style.channel}>{eventData.channel.name}</div>
      <div className={style.title}> {eventData.name} </div>
      <div className={style.userInfo}>
        <img className={style.userAvatar} src={eventData.creator.avatar} alt='无头像'></img>
        <div className={style.nameTime}>
          <div className={style.userName}>{eventData.creator.username}</div>
          <div className={style.publishDay}>Published Today</div>
        </div>
      </div>   
    </div>
  )
}
