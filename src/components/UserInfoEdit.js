import React, { useEffect, useState } from 'react';
import axios from 'axios'


export function UserInfoEdit() {
    const [userName, setuserName] = useState("no one");
    const [pass, setPass] = useState("");//for warning
    const [fname, setFName] = useState("");//for warning
    const [lname, setLName] = useState("");//for warning
    const [email, setEmail] = useState("");//for warning
    const [mode, setMode] = useState("");//state after update
    const [id, setId] = useState("");//save _id of user in mongoDB(uniqe id)
    let liName=["li1","li2","li3","li4","li5"];//for change background color og current component in navbar
    

    function dqs(ele) {
        return document.querySelector(`#${ele}`);
    }
    useEffect(() => {
        liName.map((curr) => {
            if(curr==="li4"){
            dqs(curr).style.backgroundColor = "#816FCA";
            }else{
                dqs(curr).style.backgroundColor = "#FFFFFF"
            }
        });
        if (!(localStorage.getItem("id"))) {
            window.location = '/login';
        }
        axios.get('http://localhost:3001/user/getuserinfo', { params: { id: localStorage.getItem("id") } })
            .then(res => {
                setuserName(res.data.user.username);
                dqs('fname').value = res.data.user.firstname;
                dqs('lname').value = res.data.user.lastname;
                dqs('email').value = res.data.user.email;
                setId(res.data.user._id);
            })
            .catch(err => console.log(err));
    }, []);
    function checkOldPass() {
        if (dqs('oldpass').value.length < 7){
            setPass("invalid Old Password ,min 7 let") ;
        }
        else
        setPass("");
    }
    function checkNewPass() {
        if (dqs('newpass').value != dqs('confirmnewpass').value || (dqs('newpass').value.length < 7)) {
            setPass("validate your New Password ,min 7 let") ;
        }
        else
        setPass("");
    }
    function checkConfirmPass(){
        if (dqs('confirmnewpass').value != dqs('newpass').value) {
            setPass("validate your Password") ;
        }
        else{
            setPass("");
        }
    }
    function checkFName() {
        if (dqs('fname').value.length < 3 || dqs('fname').value.length > 20) {
            setFName("-firstName-min:3/max:20") ;
        }
        else
        setFName("");
    }
    function checkLName() {
        if (dqs('lname').value.length < 3 || dqs('lname').value.length > 20) {
            setLName("-last name min:3/max:20") ;
        }
        else
        setLName("");
    }
    function checkEmail() {
        if (dqs('email').value.length < 10 || dqs('email').value.length > 50) {
            setEmail("-email min:10/max:50") ;
        }
        else
        setEmail("");
    } 
    function checkAndUpdate(){
        if(pass===""&&fname===""&&lname===""&&email===""&&dqs(`newpass`).value===dqs(`confirmnewpass`).value&&dqs(`oldpass`).value!==""&&
        dqs(`newpass`).value!==""&&dqs(`confirmnewpass`).value!==""&&dqs(`fname`).value!==""&&dqs(`lname`).value!==""&&
        dqs(`email`).value!=="")
        {
            let user={
                _id:id,
                username:userName,
                oldpass:dqs(`oldpass`).value,
                password:dqs(`newpass`).value,
                firstname:dqs(`fname`).value,
                lastname:dqs(`lname`).value,
                email:dqs(`email`).value,
            }
            axios.post('http://localhost:3001/user/update',user)
            .then((res)=>{
                console.log(res.data.message);
                if(res.data.message==="User updated"){
                    dqs(`mode`).style.color="green"
                    localStorage.removeItem("id");
                }else{
                    dqs(`mode`).style.color="red"
                }
                setMode(res.data.message);
            })
            .catch((err)=>{
                console.log("the error is :"+err)
                dqs(`mode`).style.color="red";
                setMode(err.data.message);
            });
        }else{
            dqs(`mode`).style.color="red";
            setMode("All inputs are required");
        }
    }
    return (
        <div className="login-box">
            <h1>User Edit</h1>
            <div className="textbox">
                <h2 class="h2">Hello {userName}</h2>
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input id="oldpass" type="password" placeholder="Old Password" onChange={checkOldPass}/>
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input id="newpass" type="password" placeholder="New Password" onChange={checkNewPass}/>
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input id="confirmnewpass" type="password" placeholder="Confirm New Password" onChange={checkConfirmPass}/>
            </div>

            <div className="textbox">
                <i className="fas fa-user"></i>
                <input id="fname" type="text" placeholder="First Name" onChange={checkFName}/>
            </div>

            <div className="textbox">
                <i className="fas fa-user"></i>
                <input  id="lname" type="text" placeholder="Last Name" onChange={checkLName}/>
            </div>

            <div className="textbox">
                <i className="fa fa-envelope"></i>
                <input id="email" type="email" placeholder="Email" onChange={checkEmail}/>
            </div>

            <div>
                <input type="button" className="btn" value="Update Your Info" onClick={() => checkAndUpdate()} />
            </div>
            <div className="warnings">
                    <label style={{color:"red"}}>{pass}</label>
                    <label style={{color:"red"}}>{fname}</label>
                    <label style={{color:"red"}}>{lname}</label>
                    <label style={{color:"red"}}>{email}</label>
                    <label id="mode">{mode}</label>
                </div>
        </div>
    );
}