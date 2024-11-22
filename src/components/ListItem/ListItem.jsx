import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import style from "./ListItem.module.css";
import clock from '../../pic/icons/time.svg'
import going from '../../pic/icons/check.svg'
import ungoing from '../../pic/icons/check-outline.svg'
import like from '../../pic/icons/like.svg'
import unlike from '../../pic/icons/like-outline.svg'
import my_fetch from "../../fetch";


export default function ListItem(props) {

  const {param,token} = props //取参
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


  function naviToDetail(){
    // console.log('id :>> ',param.id);
    Navigate('/Detail',{state:{...param,token:token}})
  }

  // 切换去状态
  const changeGO = async () => {
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
      setGoPic(<img src={going} alt="go" />);
      setGoText(<p>I am going!</p>);
    } else {
      param.goings_count -= 1;
      setGoPic(<img src={ungoing} alt='ungo' />);
      setGoText(<p>{param.goings_count} Going</p>);
    }
  };


  // 切换喜欢状态
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
      setLikePic(<img src={like} alt="like" />);
      setLikeText(<p>I like it</p>);
    } else {
      param.likes_count -= 1;
      setLikePic(<img src={unlike} alt="unlike" />);
      setLikeText(<p>{param.likes_count} Likes</p>);  
    }
  };

  return (
    <div className={style.container}>
      <div onClick={naviToDetail}>
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
        <div className={style.isGoLike} onClick={changeGO}>
            {goPic}
            {goText}
        </div>
         <div className={style.isGoLike} onClick={changeLike}> {/* 格式相同 */}
            {likePic}
            {likeText}
        </div>
      </div>
    </div>
  );
}



