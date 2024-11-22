import React, { useState } from 'react'
import style from './CommentBar.module.css'
import xIcon from '../../../pic/icons/cross.svg'
import sendIcon from '../../../pic/icons/send.svg'

export default function CommentBar(props) {

  const { isComment, setIsComment, handleSendComment } = props;
  const [commentText, setCommentText] = useState('');

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSendClick = (e) => {
    handleSendComment(commentText);
    setCommentText('');
  };

  return (
    <div className={style.container} id='main'>
        <div className={style.leftPart}>
            <img className={style.xIcon} src={xIcon} alt = 'cancel' onClick={() => setIsComment(!isComment)}></img>
            <input 
              className={style.inputComment} 
              placeholder='Leave your comment here'
              value={commentText}
              onChange={handleInputChange}
            ></input>
        </div>
        <div className={style.rightPart} onClick={handleSendClick}>
            <img className={style.sendIcon} src={sendIcon} alt = 'send'></img>
        </div>
    </div>
  )
}
