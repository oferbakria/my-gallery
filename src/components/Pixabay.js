import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from './PixabayImage'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SearchIcon from '@material-ui/icons/Search';
import MyGallery from './MyGallery';
import Carousel from './Carousel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



export default function Pixabay() {
    const [show, setShow] = useState(true);
    const [url, setUrl] = useState(`https://pixabay.com/api/?key=15660094-67739fa206ae2fe0666ac9e52&q=funny&image_type=photo`)
    const [data, setData] = useState([]);
    const [userName, setuserName] = useState("no one");
    let liName=["li1","li2","li3","li4","li5"];//for change background color og current component in navbar

    useEffect(() => {
        liName.map((curr) => {
            if(curr==="li5"){
            dqs(curr).style.backgroundColor = "#816FCA";
            }else{
                dqs(curr).style.backgroundColor = "#FFFFFF"
            }
        });
        axios.get(url).then(response => {
            setData(response.data.hits);
        });
        if(!(localStorage.getItem("id"))){
            window.location='/login';
        }else{
            dqs('logoutLi').style.display='block';
        }
    }, [url]);
    let images = data.map((curr) => {
        return <Image current={curr} add={(url) => addPhoto(url)} />
    });
    function getUserName(){
        axios.post('http://localhost:3001/user/getusername', {id:localStorage.getItem("id")})
        .then(res=>setuserName(res.data.name))

    }
    getUserName();
    function addPhoto(url) {
        let sendInfo = { id: localStorage.getItem("id"), imageUrl: url }
        axios.post('http://localhost:3001/image/saveUrl', sendInfo)
            .then(res => console.log(res.data.message));
    }
    function searchFor() {
        let str = document.querySelector(`.input_text`).value
        setUrl(`https://pixabay.com/api/?key=15660094-67739fa206ae2fe0666ac9e52&q=${str}&image_type=photo`)
    }
    function dqs(ele){
        return document.querySelector(`#${ele}`);
    }
    if (show) {
        return (
            <div className="allInsideApp">
                <div className="header">
                    <h1 ><AssignmentIndIcon className="userIcon" color="primary" />Welcome {userName} </h1>
                </div>
                <div className="searchDiv">
                    <input type="text" placeholder="Search" className="input_text" />
                    <SearchIcon className="searchIcon" onClick={() => searchFor()} />
                    <a className="myButton" onClick={() => setShow(false)}>My Photos</a>
                </div>
                <div className="Pixabay">
                    {images}
                </div>
                <Carousel arr={data} />
            </div>
        );
    }
    return (
        <MyGallery id={localStorage.getItem("id")} returnHome={(bool) => setShow(bool)} name={userName} />
    );
}

