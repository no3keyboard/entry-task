import React, { useEffect, useState } from 'react'
import style from './EventTab.module.css'
import onDetail from '../../../pic/icons/info.svg'
import unDetail from '../../../pic/icons/info-outline.svg'
import onPart from '../../../pic/icons/people.svg'
import unPart from '../../../pic/icons/people-outline.svg'
import onComment from '../../../pic/icons/comment.svg'
import unComment from '../../../pic/icons/comment-outline.svg'

export default function EventTab(props) {
  const { param, isSelect, setIsSelect } = props; // 取参
  
  const eventData = param;
  const [imgShow,setImgShow] = useState('')
  const [isTextShow,setIsTextShow] = useState(false)
  useEffect(() =>{
    if(param.images.length > 0){
        // console.log('param.images :>> ', param.images);
      const mapImg = param.images.map((item,index) => (
        <img 
          className={style.imgArr}
          key={index}
          src={item}
          alt='加载失败'
        ></img>
      ))
      setImgShow(mapImg)
    //   console.log('imgShow :>> ', imgShow);
    }
  },[eventData.images.length])
  const controlHide = () =>{
    setIsTextShow(!isTextShow);
  }
  return (
    <React.Fragment>
      <div className={style.tab}>
        <div className={style.tabItem} onClick={() => setIsSelect(0)}>
            {/* T为选中 F未选中 */}
          <img className={style.tabImg} src={isSelect === 0 ? onDetail : unDetail} alt='tabImg'></img>
          <div className={isSelect === 0 ? style.tabWordT :style.tabWordF}>Details</div>
        </div>
        <div className={style.participants} onClick={() => setIsSelect(1)}>
          <img className={style.tabImg} src={isSelect === 1 ? onPart : unPart} alt='tabImg'></img>
          <div className={isSelect === 1 ? style.tabWordT :style.tabWordF}>Participants</div>
        </div>
        <div className={style.tabItem} onClick={() => setIsSelect(2)}>
          <img className={style.tabImg} src={isSelect === 2 ? onComment : unComment} alt='tabImg'></img>
          <div className={isSelect === 2 ? style.tabWordT :style.tabWordF}>Comments</div>
        </div>
      </div>
      {/* 简介部分 */}
      <div className={style.imageArrDiv}>
        {imgShow}
      </div>
      <div className={style.content} id= "content">
          <div className={isTextShow ? style.showText : style.hideText}>
          {eventData.description}
          </div>
          <div className={isTextShow ? style.unHide : style.onHide}></div> {/* 渐变遮罩 */}
        <button className={style.viewButton} onClick={controlHide}>{isTextShow ? "HIDE" : "VIEW ALL"}</button>
      </div>
      <div className={style.bottomLine}></div>
    </React.Fragment>
  )
}
