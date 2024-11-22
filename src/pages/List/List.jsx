import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import style from './List.module.css'
import TopBar from '../../components/TopBar/TopBar'
import ListItem from '../../components/ListItem/ListItem'
import my_fetch from '../../fetch';
import Search from '../../components/Search/Search';

export default function List() {

  const navigate = useNavigate();
  const location = useLocation();
  const [resArr,setResArr] = useState([]);
  const [scrollHigh,setScrollHigh] = useState(0);
  const [searchResCount, setSearchResCount] = useState(null);
  const [offset,setOffset] = useState(0);
  const [isLoading,setisLoading] = useState(false);
  const [isEmpty,setIsEmpty] = useState(false)
  
  const token = location.state?.token;
  
  const handleGoBack = () => {
    navigate(-1);
  };

  //请求
  const fetchData = async () => {
    if(!token) {alert('no permission'); handleGoBack()}
    // console.log('offset :>> ', offset);
    let url = `http://localhost:3000/api/v1/events?offset=${offset}`
    let initObj = {
      headers : {
        'X-BLACKCAT-TOKEN' : token
      }
    }
    let res = await my_fetch(url,initObj)
    setResArr([...res.events])
    setisLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [token,offset])
  
  //无限滚动
  const handleScroll = (e) => {
    // console.log(e.target.scrollHeight, e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop)
    // 总高度-可见高度-滚动条距离顶部的高度<=100像素
    if(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop <= 100
      && isLoading === false
    ){
      setOffset(offset => offset + 3)
      setisLoading(true)
      let newScrollHigh = e.target.scrollHeight;//记录总高度
      setScrollHigh(newScrollHigh);
    }
  }

  // 设置滚动条位置
  useEffect(() => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.scrollTop = scrollHigh / 2;  // 设置滚动条到中间
    }
  }, [resArr]);  // resArr 变化，设置滚动位置

  //搜索功能。。好难。。。。。。
  const get_search_query = async (channel, after, before, search_text) => {
    let query = '';
    let httpUrl = '';
    if (channel !== 0 && !!(after && before)) {//channel不等于 0 且 after 和 before 都有值
      query = `?channels=${channel}&before=${before}&after=${after}`;//构建查询字符串包含频道和时间范围
    } else if (channel !== 0 && !(after && before)) {
      query = `?channels=${channel}`;//字符串仅包含频道
    } else if (channel === 0 && !!(after && before)) {
      query = `?before=${before}&after=${after}`;//仅包含时间
    } else {
      query = '';
    }
    if (query) {
      httpUrl = `http://localhost:3000/api/v1/events${query}`;
    } else {
      httpUrl = `http://localhost:3000/api/v1/events`;
    }
    let initObj = {
      headers: {
        'X-BLACKCAT-TOKEN': token,
      }
    }
    let res = await my_fetch(httpUrl, initObj);
    console.log('res :>> ', res);
    setResArr(res.events);
    setScrollHigh(0);

    let search_tip = null;
    if (res.events.length > 0) {
      setIsEmpty(false)
      search_tip = (
        <div className={style['search-tip']}>
          <div className={style['res-with-button']}>
            <p className={style.resCount}>{res.events.length} Results</p>
            <button onClick={clear_search}>CLEAR SEARCH</button>
          </div>
          <p className={style.resTip}>Searched for {search_text}</p>
        </div>
      );
    } else {
      setIsEmpty(true)
      search_tip = (
        <div>
          <div className={style['search-tip']}>
            <div className={style['res-with-button']}>
              <p className={style.resCount}>{res.events.length} Results</p>
              <button onClick={clear_search}>CLEAR SEARCH</button>
            </div>
            <p className={style.resTip}>Searched for {search_text}</p>
          </div>
          <div className={style.noActivity}>
            <div></div>
            <p>No activity found</p>
          </div>
        </div>
      );
    }
    setSearchResCount(search_tip);
  };

  const close = useCallback((e) => {
    e.target.blur();//确保点击外部时侧边栏关闭 重要API
    if (e.target !== document.getElementById("sidebar")) {
      document.getElementById("sidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  }, []);

  const clear_search = () => {
    setSearchResCount(null);
    setResArr([]); 
    setScrollHigh(0);
    setIsEmpty(false)
    fetchData();
  };

  return (
    <React.Fragment>
      <Search token={token} get_search_query={get_search_query} />
      <div style={{height: "100%", transition: "margin-left .5s", overflow: "scroll"}} id="main" onFocus={close} tabIndex="1" onScroll = {handleScroll}>
        <TopBar></TopBar>
        <div style={{height: "12.5vw", overflow: "hidden"}}></div>
        {searchResCount}
        {!isEmpty && resArr.map((item,index) => (
          <ListItem
            // 在map方法中传递ref：将addItemRef传递给最后一个列表项，以便IntersectionObserver可以观察它
            // ref={index === resArr.length - 1 ? addItemRef : null} 
            param = {item}
            key = {item.id + '' + index} //避免key重复
            itemID = {item.id}
            token = {token}
          ></ListItem>
        ))}
      </div>
    </React.Fragment>
  )
}