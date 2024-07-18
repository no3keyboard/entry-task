import React, { useState } from "react";
import style from './Login.module.css'
import { useNavigate } from "react-router-dom";
import my_fetch from "../../fetch";

export default function Login() {
  //导航跳转
  const navigate = useNavigate();
  //初始化状态
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
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
    console.log('res1 :>> ', res);
    if(res.token){
      setToken(res.token)
      setUser(res.user)
      navigate('/List',{state:{...res.user,token:res.token}}) //v6版本用navigate 代替 history.push
    }else if(res.status === 404 || res.error === "error_user_not_found"){
      //用户不存在则注册
      // console.log('用户不存在 :>> ');
      url = 'http://localhost:3000/api/v1/join';//暂时先用默认
      body = {username , password , email: 'example@example.com', avatar: 'default-avatar.png'}
      init ={
        method:'POST',
        body: JSON.stringify(body)
      }
      res = await my_fetch(url,init)
      console.log('res2 :>> ', res);
      if(res.token){
        setToken(res.token)
        setUser(res.user)
        navigate('/List',{state:{...res.user,token:res.token}})
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
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="#D5EF7F"
                className={style["svg-Layer1"]}
              >
                <title>logo-cat</title>
                <polygon points="26.47 14.44 23.07 19.93 23.07 27.38 25.83 29.84 19.2 29.84 21.89 27.36 21.89 19.72 15.69 10.95 19.62 10.95 21.48 9.19 18.18 4.17 14.73 3.14 15.15 -0.03 9.92 4.17 2.83 17.38 7.78 28.12 5.51 30.53 5.51 31.97 9.26 31.97 10.18 31.48 10.93 31.97 29.94 31.97 29.94 30.25 25.68 25.99 25.68 20.55 27.96 16.84 28.78 16.84 29.2 20.08 30.4 20.08 30.71 14.44 26.47 14.44" />
              </svg>
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
