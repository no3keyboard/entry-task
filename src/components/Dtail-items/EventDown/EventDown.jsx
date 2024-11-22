import React from "react";
import moment from 'moment';
import style from "./EventDown.module.css"
import beginIcon from '../../../pic/icons/date-from.svg'
import endIcon from '../../../pic/icons/date-to.svg'
import mapImg from '../../../pic/images/gmap.png'

export default function EventDown(props) {

  const {param} = props //取参
  
  const eventData = param;

  //时间处理
  let begin_time = moment(param.begin_time).format('DD MMM YYYY HH:mm')
  let end_time = moment(param.end_time).format('DD MMM YYYY HH:mm')
  let BeginDay = begin_time.slice(0, 11);
  let BeginTime = begin_time.slice(12);
  let endDay = end_time.slice(0, 11);
  let endTime = end_time.slice(12);

  return (
    <React.Fragment>
      <div className={style.when}>
        <div className={style.title}>When</div>
        <div className={style.whenContainer}>
          <div className={style.dateStyle}>
            <div className={style.whenContent}>
              <img src={beginIcon} />
              <div className={style.dateDay}>{BeginDay}</div>
            </div>
            <div className={style.dateTime}>{BeginTime}</div>
          </div>
          <div className={style.dateStyle1}>
            <div className={style.whenContent}>
              <img src={endIcon} />
              <div className={style.dateDay}>{endDay}</div>
            </div>
            <div className={style.dateTime}>{endTime}</div>
          </div>
        </div>
      </div>

      <div className={style.where}>
        <div className={style.title}>Where</div>
        <div className={style.whereContainer}>
          <div className={style.whereLocate}>{eventData.location}</div>
          <div className={style.whereDetail}>{eventData.location_detail}</div>
          <img src={mapImg} className={style.mapStyle} />
        </div>
      </div>
    </React.Fragment>
  );
}
