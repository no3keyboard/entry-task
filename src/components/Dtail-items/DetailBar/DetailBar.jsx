import React, { useState } from 'react'
import style from './DetailBar.module.css'
import commentIcon from '../../../pic/icons/comment-single.svg'
import unlikeIcon from '../../../pic/icons/like-outline_2.svg'
import likeIcon from '../../../pic/icons/like_2.svg'
import unjoinIcon from '../../../pic/icons/check-outline_2.svg'
import jionIcon from '../../../pic/icons/check_2.svg'
import my_fetch from '../../../fetch'

export default function DetailBar(props) {

  const {param,token,isComment,setIsComment,handleUpdateParam} = props //取参
  const [isLike,setIsLike] = useState(param.me_likes)
  const [isJoin,setIsJoin] = useState(param.me_going)

  const changeLike = async () => {
    let url = `http://localhost:3000/api/v1/events/${param.id}/likes`;
    let initObj = {
      method: param.me_likes ? 'DELETE' : 'POST',
      headers: {
        'X-BLACKCAT-TOKEN': token,
      },
    };
    await my_fetch(url, initObj);
    param.me_likes = !param.me_likes;
    if (param.me_likes) {
      param.likes_count += 1;
    } else {
      param.likes_count -= 1;
    }
    setIsLike(param.me_likes)
    handleUpdateParam(param);
  }

  const changeJoin = async () => {
    let url = `http://localhost:3000/api/v1/events/${param.id}/participants`;
    let initObj = {
      method: param.me_going ? 'DELETE' : 'POST',
      headers: {
        'X-BLACKCAT-TOKEN': token,
      },
    };
    await my_fetch(url, initObj);
    param.me_going = !param.me_going;
    if (param.me_going) {
      param.goings_count += 1;
    } else {
      param.goings_count -= 1;
    }
    setIsJoin(param.me_going)
    handleUpdateParam(param);
  }

  const changeToComment = () => {
    setIsComment(!isComment)
  }

  return (
    <div className={style.detailBar}>
    <div className={style.leftPart}>
      <img className={style.commentICON} src={commentIcon} alt='comment' onClick={changeToComment}></img>
      <img className={style.likeICON} src={isLike ? likeIcon:unlikeIcon} alt='like' onClick={changeLike} ></img>
    </div>
    <div className={style.rightPart}  onClick={changeJoin}>
      <img className={style.jionICON} src={isJoin ? jionIcon : unjoinIcon} alt='join'></img>
      {isJoin ? <p style={{color:"#8560A9"}}>I am going</p> : <p>Jion</p>}
    </div>
  </div>
  )
}
