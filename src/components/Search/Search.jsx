import React, { useState, useEffect } from "react";
import my_fetch from "../../fetch";
import style from "./Search.module.css";
import moment from "moment";

export default function Search({ token, get_search_query }) {
  //写着写着成史山了。。。
  const [channel, setChannel] = useState([]);//频道列表
  const [datePickId, setDatePickId] = useState(-1);//日期选项
  const [channelPickId, setChannelPickId] = useState(-1);//已选频道
  const [searchInput, setSearchInput] = useState(null);//日期输入
  const [searchChannelText, setSearchChannelText] = useState("");//已选频道显示在底部button
  const [searchDateText, setSearchDateText] = useState("");//已选日期显示在底部button
  const [searchDateFrom, setSearchDateFrom] = useState("");//起始日期
  const [searchDateTo, setSearchDateTo] = useState("");//结束日期
  const [searchText, setSearchText] = useState("");//完整描述
  const [lineTip, setLineTip] = useState(null);//提示元素
  const [selectChannelId, setSelectChannelId] = useState(1);//选择频道ID
  const [selectDateBefore, setSelectDateBefore] = useState("");//截止日
  const [selectDateAfter, setSelectDateAfter] = useState("");//起始日

  useEffect(() => {
    const fetchChannels = async () => {
      const httpUrl = "http://localhost:3000/api/v1/channels";
      const initObj = {
        headers: {
          "X-BLACKCAT-TOKEN": token,
        },
      };
      const res = await my_fetch(httpUrl, initObj);
      setChannel([{ id: 0, name: "All" }, ...res.channels]);
    };
    fetchChannels();
  }, [token]);

  const datePick = (e) => {
    const selectedDateId = e.target.tabIndex;
    setDatePickId(selectedDateId);//传入高亮显示
    if (e.target.innerText === "LATER") {//选择Later
      setSearchInput(
        <div className={style.inputContainer}>
          <input
            className={`${style.searchInput} ${style.dateFrom}`}
            onChange={(e) => setSearchDateFrom(moment(e.target.value, "DD/MM HH").valueOf())}
            placeholder="DD/MM HH"
          />
          <input
            className={`${style.searchInput} ${style.dateTo}`}
            onChange={(e) => setSearchDateTo(moment(e.target.value, "DD/MM HH").valueOf())}
            placeholder="DD/MM HH"
          />
          <div className={style.sharpCornar}></div>
        </div>
      );
    } else {
      setSearchInput(null);
    }
    switch (e.target.innerText) {
      case "TODAY":
        setSearchDateText(`in ${moment().format("DD/MM HH")}`);
        setSearchDateFrom(moment().startOf('day').valueOf()); 
        setSearchDateTo(moment().endOf('day').valueOf()); 
        break;
      case "TOMORROW":
        setSearchDateText(`in ${moment().add(1, "day").format("DD/MM HH")}`);
        setSearchDateFrom(moment().add(1, "day").startOf('day').valueOf()); 
        setSearchDateTo(moment().add(1, "day").endOf('day').valueOf()); 
        break;
      case "THIS WEEK":
        setSearchDateText(
          `from ${moment().startOf("week").format("DD/MM HH")} to ${moment().endOf("week").format("DD/MM HH")}`
        );
        setSearchDateFrom(moment().startOf('week').valueOf()); 
        setSearchDateTo(moment().endOf('week').valueOf()); 
        break;
      case "THIS MONTH":
        setSearchDateText(`in ${moment().format("MM DD/MM HH")}`);
        setSearchDateFrom(moment().startOf('month').valueOf()); 
        setSearchDateTo(moment().endOf('month').valueOf()); 
        break;
      case "ANYTIME":
        setSearchDateText("");
        setSearchDateFrom("");
        setSearchDateTo("");
        setSelectDateAfter("");
        setSelectDateBefore("");
        break;
      default:
        break;
    }
  };

  useEffect(() => {//保证时间更新
    if (datePickId >= 0 && channelPickId >= 0) {
      setSelectDateAfter(searchDateFrom);
      setSelectDateBefore(searchDateTo);
    }
  }, [searchDateFrom, searchDateTo]);

  const channelPick = (e) => {
    setChannelPickId(e.target.tabIndex);//点击的频道
    setSearchChannelText(e.target.innerText);//频道名称
    setSelectChannelId(e.target.tabIndex);
  };

  const commit = () => {
    setSelectDateAfter(searchDateFrom);
    setSelectDateBefore(searchDateTo);
    if (datePickId >= 0 && channelPickId >= 0) {
      console.log(channelPickId, selectDateAfter, selectDateBefore, datePickId);
      get_search_query(channelPickId, selectDateAfter, selectDateBefore, searchText);
      document.getElementById("sidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  };

  useEffect(() => {
    if (datePickId >= 0 && channelPickId >= 0) {
      if (searchInput) {//有日期输入则更新 searchDateText 状态
        setSearchDateText(`from ${searchDateFrom} to ${searchDateTo}`);
      }
      //set包含频道和日期的字符串
      setSearchText(`${searchChannelText} activities ${searchDateText}`);
      setLineTip(
        <div className={style["line-tip-container"]}>
          <p className={style["line-tip"]}>{searchText}</p>
        </div>
      );
    }
  }, [//effect依赖项
    datePickId,
    channelPickId,
    searchInput,
    searchChannelText,
    searchDateText,
    searchDateFrom,
    searchDateTo,
    searchText,
  ]);

  const dateParamsList = [ //时间列表
    "ANYTIME",
    "TODAY",
    "TOMORROW",
    "THIS WEEK",
    "THIS MONTH",
    "LATER",
  ];
  const dateList = dateParamsList.map((item, index) => (
    <li
      className={datePickId === index ? style["date-item-pick"] : style["date-item"]}
      key={item}
      onClick={datePick}
      tabIndex={index}>
      {item}
    </li>
  ));

  const channelList = channel.map((item) => (
    <li
      className={channelPickId === item.id ? style["channel-item-pick"] : style["channel-item"]}
      key={item.id}
      onClick={channelPick}
      tabIndex={item.id}>
      {item.name}
    </li>
  ));

  return (
    <div className={style.sidebar} id="sidebar">
      <div className={style.itemContent}>
        <p className={style.title}>DATE</p>
        <ul className={style.itemList}>{dateList}</ul>
        {searchInput}
      </div>
      <div className={style.itemContent} style={{ marginTop: "24px" }}>
        <p className={style.title}>CHANNEL</p>
        <ul className={style.itemList}>{channelList}</ul>
      </div>
      <button
        className={datePickId >= 0 && channelPickId >= 0 ? style["search-ready"] : style.search}
        onClick={commit}>
        SEARCH
      </button>
      {lineTip}
    </div>
  );
}
