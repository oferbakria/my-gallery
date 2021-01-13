import React,{useState} from 'react';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';


export default function Image(props) {
    const [added, setAdded] = useState("");
    return (
        <div className="Image">
            <div className="hover_box_content">
                <div>
                    <a className="s" onClick={() => {setAdded(`photo added`);props.add(props.current.webformatURL);}} ><AddToPhotosIcon className="add" color="primary" /></a><br />
                    <label className="labelToSHowFterAddedPhoto">{added}</label>
                </div>
            </div>
            <img src={props.current.webformatURL} alt="image from Pixabay server" /><br />
            <label>{props.current.user}</label><br />
            <label>likes-{props.current.likes}</label><br />
        </div>
    );
}
