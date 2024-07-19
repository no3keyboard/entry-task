import React, { useEffect, useState } from "react";
import style from "./ListItem.module.css";
import clock from '../../pic/icons/time.svg'

export default function ListItem() {


  const [pic,setpic] = useState(null)
//   const [,]
  let i = 1;

  useEffect(() => {

    //判断是否有标题图
    if(i === 1){
        setpic(<img className={style.titlePic} src="" alt="标题图"></img>)
    }else{
        setpic(<p></p>)
    }

  },[i])//记得参数不然无限渲染

  function gotoDetail() {
    console.log("gotodetailClick :>> ");
  }

  return (
    <div className={style.container} onClick={gotoDetail}>
      <div className={style.userInfo}>
        <div className={style.userMes}>
          <img src="" alt="无头像"></img>
          <p className={style.userName}>user123</p>
        </div>
        <div className={style.channel}> channel </div>
      </div>
      <div className={style.titleArea}>
        <div>
          <div className={style.title}>titletitletitletitletitletitletitletitletitletitle</div>
          <div className={style.timeLine}>
            <img src={clock} alt="时间图标"></img>
            <p className={style.time}>timeBG - timeED</p>
          </div>
        </div>
          {pic}
        
      </div>
      <div className={style.contentText}>内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2
      内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2
      内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2
      内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2内容1内容2
      </div>
      <div className={style.goAndLike}>
        <div className={style.isGo}></div>
        <div className={style.isLike}></div>
      </div>
    </div>
  );
}
