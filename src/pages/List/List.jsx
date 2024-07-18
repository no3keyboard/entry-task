import React from 'react'
import style from './List.module.css'
import TopBar from '../../components/TopBar/TopBar'

export default function List() {
  return (
    <React.Fragment>
      <div style={{height: "100%", overflow: "scroll"}}>
      <TopBar></TopBar>
      <div className={style.test}>list</div>
      </div>
    </React.Fragment>
  )
}
