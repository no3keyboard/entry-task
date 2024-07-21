import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import style from "./ListItem.module.css";
import clock from '../../pic/icons/time.svg'
import going from '../../pic/icons/check.svg'
import ungoing from '../../pic/icons/check-outline.svg'
import like from '../../pic/icons/like.svg'
import unlike from '../../pic/icons/like-outline.svg'


export default function ListItem(props) {

  const {param} = props //取参

  const Navigate = useNavigate()
  //初始化
  const [pic,setpic] = useState(null)
  const [goPic,setGoPic] = useState(null)
  const [goText,setGoText] = useState('')
  const [likePic,setLikePic] = useState(null)
  const [likeText,setLikeText] = useState('')

  useEffect(() => {
    //是否去
    if(param.me_going){
        setGoPic(<img src={going} alt="go"></img>)
        setGoText(<p>I am going!</p>)
    }else{
        setGoPic(<img src={ungoing} alt='ungo'></img>)
        setGoText(<p>{param.goings_count} Going</p>)
    }

    //是否喜欢
    if(param.me_likes){
        setLikePic(<img src={like} alt="like"></img>)
        setLikeText(<p>I like it</p>)
    }else{
        setLikePic(<img src={unlike} alt="unlike"></img>)
        setLikeText(<p>{param.likes_count} Likes</p>)
    }

    //判断是否有标题图
    if(param.images.length > 0){               //第0张太难看了
        setpic(<img className={style.titlePic} src={param.images[1]} alt="标题图"></img>)
    }else{
        setpic(<p></p>)
    }

  },[param])//记得参数不然无限渲染


  function naviToDatail(){
    console.log('id :>> ',param.id);
    Navigate('/Detail',{state:{...param}})
  }

  return (
    <div className={style.container}>
      <div onClick={naviToDatail}>

        <div className={style.userInfo}>
          <div className={style.userMes}>
            <img src={param.creator.avatar} alt="无头像"></img>
            <p className={style.userName}>{param.creator.username}</p>
          </div>
          <div className={style.channel}> {param.channel.name} </div>
        </div>
        <div className={style.titleArea}>
          <div>
            <div className={style.title}>{param.name}</div>
            <div className={style.timeLine}>
              <img src={clock} alt="时间图标"></img>
              <p className={style.time}>{`${moment(param.begin_time).format('DD MMM YYYY HH:mm')} - ${moment(param.end_time).format('DD MMM YYYY HH:mm')}`}</p>
            </div>
          </div>
            {pic}
        </div>

        <div className={style.contentText}>{param.description}</div>

      </div>
      <div className={style.goAndLike}>
        <div className={style.isGoLike}>
            {goPic}
            {goText}
        </div>
         <div className={style.isGoLike}> {/* 格式一样 */}
            {likePic}
            {likeText}
        </div>
      </div>
    </div>
  );
}



