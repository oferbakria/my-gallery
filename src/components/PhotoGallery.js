import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';


export default function PhotoGallery(props) {

    function deleteImg(imgId){
        axios.post(`http://localhost:3001/image`,{id:imgId})
        .then(res=>{
            props.refreshImgList(props.count+1);
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className="Image">
            <div className="hover_box_content_del">
                <div>
                    <a className="s" onClick={() => deleteImg(props.current._id)} ><DeleteIcon className="del" color="primary" /></a>
                </div>
            </div>
            <img src={props.current.imageUrl} alt="image from Pixabay server" /><br />
            <label>{props.current.updatedAt.slice(0, 10)}</label><br />
        </div>
    );
}
