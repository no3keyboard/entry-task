import React from 'react'
import { useLocation } from 'react-router-dom'
import style from './Detail.module.css'
import TopBar from '../../components/TopBar/TopBar';
import EventTop from '../../components/Dtail-items/EventTop/EventTop';

export default function Detail() {
  
  const location = useLocation();
  const eventData = location.state;
  console.log('eventData :>> ', eventData);
  return (
    <div className={style.container}>
      <TopBar></TopBar>
      <EventTop param= {eventData}></EventTop>
      
    </div>
  )
}
