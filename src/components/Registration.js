import React, { useState ,useEffect} from 'react';
import axios from 'axios';

export function Registration() {
    const [uname, setUName] = useState("");//for warning
    const [pass, setPass] = useState("");//for warning
    const [fname, setFName] = useState("");//for warning
    const [lname, setLName] = useState("");//for warning
    const [email, setEmail] = useState("");//for warning
    const [mode, setMode] = useState("");//state after register
    let liName=["li1","li2","li3","li4","li5"];//for change background color og current component in navbar
    useEffect(() => {
        liName.map((curr) => {
            if(curr==="li2"){
            dqs(curr).style.backgroundColor = "#816FCA";
            }else{
                dqs(curr).style.backgroundColor = "#FFFFFF";
            }
        });
      }, []);

    function dqs(ele){
        return document.querySelector(`#${ele}`);
    }
    function checkUName() {
        if (dqs('uname').value.length < 3 || dqs('uname').value.length > 20) {
            setUName("-UserName min:2/max:20") ;
        }
        else
        setUName("");
    }
    function checkPass() {
        if (dqs('pass').value != dqs('confirmPass').value || (dqs('pass').value.length < 7)) {
            setPass("validate your Password ,min 7 let") ;
        }
        else
        setPass("");
    }
    function checkConfirmPass(){
        if (dqs('pass').value != dqs('confirmPass').value) {
            setPass("validate your Password") ;
        }
        else{
            dqs('pass').value.length < 7 ? setPass("validate your Password ,min 7 let"):setPass("");
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
    function TryToRegisterMe(){
    if(uname===""&&pass===""&&fname===""&&lname===""&&email===""&&dqs(`pass`).value===dqs(`confirmPass`).value&&dqs(`uname`).value!==""&&
    dqs(`pass`).value!==""&&dqs(`confirmPass`).value!==""&&dqs(`fname`).value!==""&&dqs(`lname`).value!==""&&
    dqs(`email`).value!=="")
    {
        let user={
            username:dqs(`uname`).value,
            password:dqs(`pass`).value,
            firstname:dqs(`fname`).value,
            lastname:dqs(`lname`).value,
            email:dqs(`email`).value
        }
        axios.post('http://localhost:3001/user/signup',user)
        .then((res)=>{
            res.data.message==="User created"?dqs(`mode`).style.color="green":dqs(`mode`).style.color="red";
            setMode(res.data.message);
        })
        .catch((err)=>{
            dqs(`mode`).style.color="red";
            setMode(err.data.message);
        });
    }
    }
    // liName.map((curr) => {
    //     if(curr==="li2"){
    //     dqs(curr).style.backgroundColor = "red";
    //     }else{
    //         dqs(curr).style.backgroundColor = "blue";
    //     }
    // });
    return (
        <div class="login-box">
            <h1>Registration</h1>
            <div className="textbox">
                <i className="fas fa-user"></i>
                <input id="uname" type="text" placeholder="Username" onChange={checkUName} required />
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input id="pass" type="password" placeholder="Password" onChange={checkPass} required />
            </div>

            <div className="textbox">
                <i className="fas fa-lock"></i>
                <input id="confirmPass" type="password" placeholder="Confirm Password" onChange={checkConfirmPass} required />
            </div>

            <div className="textbox">
                <i className="fas fa-user"></i>
                <input id="fname" type="text" placeholder="First Name" onChange={checkFName} required />
            </div>

            <div className="textbox">
                <i className="fas fa-user"></i>
                <input id="lname" type="text" placeholder="Last Name" onChange={checkLName} required />
            </div>

            <div className="textbox">
                <i className="fa fa-envelope"></i>
                <input id="email" type="email" placeholder="Email" onChange={checkEmail} required />
            </div>

            <div>
                <input id="regbtn" type="button" className="btn" value="Submit" onClick={() => TryToRegisterMe()} />
                <div className="warnings">
                    <label style={{color:"red"}}>{uname}</label>
                    <label style={{color:"red"}}>{pass}</label>
                    <label style={{color:"red"}}>{fname}</label>
                    <label style={{color:"red"}}>{lname}</label>
                    <label style={{color:"red"}}>{email}</label>
                    <label id="mode">{mode}</label>
                </div>
            </div>
        </div>
    );
}