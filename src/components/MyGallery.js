import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoGallery from './PhotoGallery'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';


export default function MyGallery(props) {
    const [data, setData] = useState([]);
    const [filterID, setFilterID] = useState(0);//filterID - to do refresh after delete on of user gallery images
    let userId=props.id;
    useEffect(() => {
        axios.post('http://localhost:3001/image/images',{id:userId}).then(response => {
            setData(response.data.info);
        })
    }, [filterID]); 

    let images = data.map((curr) => {
        return <PhotoGallery current={curr} refreshImgList={(val)=>setFilterID(val)} count={filterID} />
    });

    return (
        <div className="allInsideApp">
        <div className="header">
            <h1><AssignmentIndIcon className="userIcon" color="primary" />Welcome {props.name} </h1>
        </div>
        <div className="searchDiv">
            <a className="myButton" style={{"margin-right":"110px"}} onClick={() =>props.returnHome(true)}>Home</a>
        </div>
        <div className="Pixabay">
            {images}
        </div>
    </div>
    );
}
