import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



export function Login() {
    const [mode, setMode] = useState("");//state after login
    let liName=["li1","li2","li3","li4","li5"];//for change background color og current component in navbar
    useEffect(() => {
        liName.map((curr) => {
            if(curr==="li3"){
            dqs(curr).style.backgroundColor = "#816FCA";
            }else{
                dqs(curr).style.backgroundColor = "#FFFFFF"
            }
        });
        let idd=localStorage.getItem("id");
       if(idd!==null){
        axios.post('http://localhost:3001/user/checkId', {id:localStorage.getItem("id")})
        .then(res=>{
            if(res.data.message==="Auth Id"){
                window.location="/pixabay";
            }
            else{
                localStorage.removeItem("id");
                dqs('logoutLi').style.display='none';
            }
        })
        }
        else{
        dqs('logoutLi').style.display='none';
        }
      }, []);

    function dqs(ele){
        return document.querySelector(`#${ele}`);
    }
    function checkLogin() {
        let user={ username: dqs("user").value, password: dqs("pass").value }
        if (dqs("user").value !== "" && dqs("pass").value !== "") {
            axios.post('http://localhost:3001/user/login', user)
            .then(res => {
               if(res.data.message === "auth succesfull"){
                   localStorage.setItem('id',res.data.user._id);
                   window.location="/pixabay";
               }else{
                dqs(`mode`).style.color="red";
                setMode(res.data.message);
               }

            })
            .catch(err => console.log(err))
        }
        else {
            dqs(`mode`).style.color="red";
            setMode("invalid username/password");
        }
    }

    return (
        <div className="login-box">
            {/* {dqs('li3').style.backgroundColor = "red"} */}
            <h1>Login</h1>
            <div className="textbox">
                <i className="fas fa-user"></i>
                <input id="user" type="text" placeholder="Username" />
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input id="pass" type="password" placeholder="Password" />
            </div>
            <div>
                <input type="button" className="btn" value="Login" onClick={()=>checkLogin()} />
                <a className="btna" href="/registration" >I don't have an account</a>
            </div> <br/>
            <div className="warnings">
            <label id="mode">{mode}</label>
            </div>
        </div>

    );
}
  