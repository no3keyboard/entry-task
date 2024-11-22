import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import style from "./Comments.module.css"
import forwordIcon from '../../../pic/icons/reply.svg'
import my_fetch from '../../../fetch';

export default function Comments(props) {

  const location = useLocation();
  const {param , commentMes} = props //取参
  const token = location.state?.token;
  let id = param.id

  const [comment,setComment] = useState([]);

  const fetchData = async () => {
    if(!token) {alert('no permission');}
    let url = `http://localhost:3000/api/v1/events/${id}/comments`;
    let initObj = {
      headers : {
        'X-BLACKCAT-TOKEN' : token
      }
    }
    let res = await my_fetch(url,initObj)
    // console.log('res :>> ', res);
    setComment(res.comments.reverse())
  }

  useEffect(() => {
    fetchData()
  }, [id,commentMes])

  const formatTime = (creatTime) => {
    const now = moment()
    const created = moment(creatTime)
    const duration = moment.duration(now.diff(created))
    if(duration.asMinutes() < 60){
      if(duration.asMinutes() < 1)
        return 'just now'
      return `${Math.floor(duration.asMinutes())} minutes ago`
    }else if(duration.asHours() < 24){
      return `${Math.floor(duration.asHours())} hours ago`
    }else{
      return `${Math.floor(duration.asDays())} days ago`
    }

  }

  const showComment = comment.map((item,index) => {
    return(
      <div className={style.commentItem} key = {index}>
      <img className={style.userAvatar} src={item.user.avatar} alt='无头像'></img>
      <div className={style.commentInfo}>
        <div className={style.headLine}>
          <div className={style.userName}>{item.user.username}</div>
          <div className={style.postTime}>{formatTime(item.create_time)}</div>
          <img className={style.forwordIcon} src={forwordIcon} alt='转发'></img>
        </div>
        <div className={style.commentText}>{item.comment}</div>
      </div>
      </div>
    )
  })

  return (
    <React.Fragment>
      <div className={style.container}>
        {showComment}
      </div>
    </React.Fragment>
  )
}
