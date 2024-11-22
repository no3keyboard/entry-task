import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import style from './Detail.module.css'
import TopBar2 from '../../components/TopBar/TopBar2';
import EventTop from '../../components/Dtail-items/EventTop/EventTop';
import EventTab from '../../components/Dtail-items/EventTab/EventTab';
import EventDown from '../../components/Dtail-items/EventDown/EventDown';
import Participants from '../../components/Dtail-items/Participants/Participants';
import Comments from '../../components/Dtail-items/Comments/Comments';
import DetailBar from '../../components/Dtail-items/DetailBar/DetailBar';
import CommentBar from '../../components/Dtail-items/DetailBar/CommentBar';
import my_fetch from '../../fetch';

export default function Detail() {
  
  const location = useLocation();
  const eventData = location.state || {};
  const token = eventData.token;
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState(0);
  const [isComment,setIsComment] = useState(false);
  const [commentMes,setCommentMes] = useState('');
  const [param, setParam] = useState(eventData);

  useEffect(() => {
    //检查token是否存在
    if (!token) {
      alert('No permission. Redirecting to login page.');
      navigate(-1);
      return;
    }
  }, [token, navigate]);
  if (!token) {
    return null;
  }

  const handleSendComment = async (commentText) => {
    let url = `http://localhost:3000/api/v1/events/${eventData.id}/comments`;
    let initObj = {
      method: 'POST',
      headers: {
        'X-BLACKCAT-TOKEN': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment: commentText}),
    };
    let res = await my_fetch(url, initObj);
    // console.log('res :>> ', res);
    if (res) {
      setCommentMes(commentText);
    }
  };

  //状态提升同步go和like
  const handleUpdateParam = (newParam) => {
    setParam({ ...param, ...newParam });
  };

  return (
    <div className={style.container}>
      <TopBar2></TopBar2>
      <EventTop param = {eventData}></EventTop>
      <EventTab param = {eventData} isSelect={isSelect} setIsSelect={setIsSelect}></EventTab>
      {/* 中间内容 */}
      {isSelect === 0 && (<>
          <EventDown param={eventData} />
          <Participants param={eventData} token={token} />
          <Comments param={eventData} token={token} commentMes={commentMes}/>
          </>
      )}
      {isSelect === 1 && (<>
          <Participants param={eventData} token={token} />
          <Comments param={eventData} token={token} commentMes={commentMes}/></>
      )}
      {isSelect === 2 && (
        <Comments param={eventData} token={token} commentMes={commentMes} />
      )}
      {/* 底部条 */}
      {isComment ? 
        <CommentBar 
          isComment = {isComment} 
          setIsComment={setIsComment} 
          handleSendComment={handleSendComment}> 
      </CommentBar> 
      : <DetailBar 
          param={eventData} 
          token={token} 
          isComment = {isComment} 
          setIsComment={setIsComment}
          handleUpdateParam={handleUpdateParam}>
        </DetailBar> }
    </div>
  )
}
