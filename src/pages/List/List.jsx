import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import style from './List.module.css'
import TopBar from '../../components/TopBar/TopBar'
import ListItem from '../../components/ListItem/ListItem'
import my_fetch from '../../fetch';
export default function List() {
  const location = useLocation();
  const [resArr,setResArr] = useState([]);
  const [scrollHigh,setScrollHigh] = useState(0);
  const token = location.state?.token;
  //请求
  const fetchData = async () => {
    // if(!token) {alert('no permission')}
    let url = "http://localhost:3000/api/v1/events"
    let initObj = {
      headers : {
        'X-BLACKCAT-TOKEN' : token
      }
    }
    let res = await my_fetch(url,initObj)
    // console.log('res :>> ', res);
    setResArr([...res.events])
  }
  
  useEffect(() => {
    fetchData()
  }, [token])
  
  //无限滚动
  const handleScroll = (e) => {
    let len = resArr.length;
    // 总高度-可见高度与滚动条距离顶部的高度小于100像素
    if(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop <= 100){
      // console.log('e.target :>> ', e.target);
      // console.log('e.target.scrollHeight2 :>> ', e.target.scrollHeight);
      let newScrollHigh = e.target.scrollHeight;//记录高度
      setResArr(preArr => {
        const newArr = [...preArr,...preArr]
        if(scrollHigh < newScrollHigh && scrollHigh !== 0){
          return newArr.slice(0,len * 0.5)//当前高度小于记录高度时截取一半
        }else{
          return newArr
        }
      })
      setScrollHigh(newScrollHigh);
    }
  }
  return (
    <React.Fragment>
      <div style={{height: "100%", overflow: "scroll"}} onScroll = {handleScroll}>
        <TopBar></TopBar>
        <div style={{height: "12.5vw", overflow: "hidden"}}></div>{/* 占位 */}
        {resArr.map((item,index) => (
          <ListItem
            // 在map方法中传递ref：将addItemRef传递给最后一个列表项，以便IntersectionObserver可以观察它
            // ref={index === resArr.length - 1 ? addItemRef : null} 
            param = {item}
            key = {item.id + '' + index} //避免key重复
            itemID = {item.id}
          ></ListItem>
        ))}
      </div>
    </React.Fragment>
  )
}