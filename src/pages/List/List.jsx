import React from 'react'
import style from './List.module.css'
import TopBar from '../../components/TopBar/TopBar'
import ListItem from '../../components/ListItem/ListItem'

export default function List() {
  return (
    <React.Fragment>
      <div style={{height: "100%", overflow: "scroll"}}>
        <TopBar></TopBar>
        <div style={{height: "12.5vw", overflow: "hidden"}}></div>{/* 占位 */}
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
      </div>
    </React.Fragment>
  )
}
