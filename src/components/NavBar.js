import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export function NavBar() {
    function logOut() {
        localStorage.removeItem("id");
        window.location = "/login";
    }
    return (
        <div className="nvbar">
            <ul>
                 <li id="li1"><Link to="/logo"><i className="fas fa-user"></i> About Us</Link></li>
                <li id="li2"><Link to="/registration">Registration</Link></li>
                <li id="li3"><Link to="/login">Login</Link></li>
                <li id="li4"><Link to="/edit">User Update</Link></li>
                <li id="li5"><Link to="/pixabay">Pixabay</Link></li>
                <li id="logoutLi" onClick={logOut}><Link to="/login"><ExitToAppIcon className="logoutIcon" color="primary"/>LogOut</Link></li>
            </ul>
        </div>
    );
}
