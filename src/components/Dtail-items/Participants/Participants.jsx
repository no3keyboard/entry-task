import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import my_fetch from '../../../fetch';
import style from "./Participants.module.css";
import going from '../../../pic/icons/check-outline.svg'
import like from '../../../pic/icons/like-outline.svg'

export default function Participants(props) {

  const location = useLocation();
  const {param} = props //取参
  const token = location.state?.token;
  let id = param.id

  const [parter,setParter] = useState([])
  const [likers,setLikers] = useState([])
  //请求
  const fetchData = async () => {
    let url = `http://localhost:3000/api/v1/events/${id}/participants`
    let initObj = {
      headers : {
        'X-BLACKCAT-TOKEN' : token
      }
    }
    let participants = await my_fetch(url, initObj);
    // console.log('participants :>> ', participants);
    setParter(participants.users)
    url = `http://localhost:3000/api/v1/events/${id}/likes`
    let likes = await my_fetch(url, initObj);
    setLikers(likes.users)
  }

  useEffect(() => {
    fetchData()
  }, [id,param.me_likes, param.me_going])

  const showPater = parter.map( (item, index) => {
    return (<li key={index}><img src={item.avatar} className={style.userIcon} alt='jioner'/></li>)
  });

  const showLikers = likers.map( (item, index) => {
    return (<li key={index}><img src={item.avatar} className={style.userIcon} alt='liker'/></li>) 
  });

  return (
    <React.Fragment>
      <div className={style.userList}>
        <div className={style.userContainer}
          style={{ paddingTop: "24px", paddingBottom: "12px" }}>
          <div className={style.goingLikes}>
            <img src={going} className={style.icon} alt='go'/>
            <p>{param.goings_count} going</p>
          </div>
          <ul className={style.imgList}>{showPater}</ul>
          <div className={style.user_list_but}>
            <div className={style.down_tri}></div>
          </div>
        </div>
        <div className={style.userContainer}
        style={{ paddingTop: "12.5px", paddingBottom: "16px" }}>
          <div className={style.goingLikes}>
            <img src={like} className={style.icon} alt='like'/>
            <p>{param.likes_count} likes</p>
          </div>
          <ul className={style.imgList}>{showLikers}</ul>
          <div className={style.user_list_but}>
            <div className={style.down_tri}></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
