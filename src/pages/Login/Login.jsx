import React, { useState } from "react";
import style from './Login.module.css'
import { useNavigate } from "react-router-dom";
import my_fetch from "../../fetch";
import logoIcon from '../../pic/icons/logo-cat.svg'

export default function Login() {
  //导航跳转
  const Navigate = useNavigate();
  //初始化状态
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  
  const onLogin = async() => {
    let url = ('http://localhost:3000/api/v1/auth/token')
    let body = {username,password}
    let init = {
      method:'POST',
      body: JSON.stringify(body)
    }
    let res = await my_fetch(url,init)
    // console.log('res1 :>> ', res);
    if(res.token){
      setToken(res.token)
      setUser(res.user)
      Navigate('/List',{state:{...res.user,token:res.token}}) //v6版本用navigate 代替 history.push
    }else if(res.status === 404 || res.error === "error_user_not_found"){
      //用户不存在则注册
      // console.log('用户不存在 :>> ');
      url = 'http://localhost:3000/api/v1/join';
      body = {username , password , email: username + '@shopee.com', avatar: 'https://coding.net/static/fruit_avatar/Fruit-5.png'}
      init ={
        method:'POST',
        body: JSON.stringify(body)
      }
      res = await my_fetch(url,init)
      // console.log('res2 :>> ', res);
      if(res.token){
        setToken(res.token)
        setUser(res.user)
        Navigate('/List',{state:{...res.user,token:res.token}})
      }
    }else{
      alert('Incorrect password')
    }
  } 

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.insideBox}>
          <div className={style.picText}>
            <div className={style.titleDiv}>
              <p className={style.title1}>FIND THE MOST LOVED ACTIVITIES</p>
              <p className={style.title2}>BLACK CAT</p>
            </div>
            <div className={style.svgDiv}>
              <img
                src={logoIcon}
                id="Layer_1"
                data-name="Layer 1"
                className={style["svg-Layer1"]}
              >
              </img>
            </div>
          </div>
          <div className={style.inputDiv}>
            <input
              type="text"
              className={style.input+' '+style.username}
              placeholder="username"
              onChange={(e) => 
                setUsername(e.target.value)
              }
            />
            <input
              type="password"
              className={style.input+' '+style.password}
              placeholder="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
       <button className={style.button} onClick={onLogin} > 
        SIGN IN
      </button>
    </div>
  );
}
