import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { MdOutlineDashboardCustomize, MdOutlineCloudUpload, MdOutlineDeleteSweep, MdOutlineNotificationImportant, MdNewspaper, MdLogout ,MdOutlineWbSunny,MdOutlineNightsStay  } from "react-icons/md";
import userImg  from '../../assets/Images/user.png'
import { LuFileEdit } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaRegEdit,FaRegFile  } from "react-icons/fa";
import './SideNav.css'

function SideNav({ ondashbroad, onFileUpload, onFileView, onEditFile, onDeleteFile, onNews, onCircular, onLogout }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userName = decodedToken.username;
        setUsername(userName)
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    } else {
      console.error('Token not found in localStorage');
    }
  }, []);

  const date = new Date();
  const hours = date.getHours();
  
  let timeOfDay;
  let icon;
  if (hours < 12) {
    timeOfDay = 'morning';
    icon= <TiWeatherPartlySunny />
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'afternoon';
    icon= <MdOutlineWbSunny />
  } else {
    timeOfDay = 'night';
    icon= <MdOutlineNightsStay  />
  }
  
  return (
    <div>
      <div className="header">
        <div className="side-nav">
            <h1>Good {timeOfDay} <i>{icon}</i></h1>
            <div className="user">
                <img src={userImg} alt="user-img" className="user-img" />
                <div>
                    <h2>{username}</h2>
                    <p>Sir/Madam</p>
                </div>
                <i className="edit-img"><FaRegEdit /></i>
            </div>
            <ul className="sidenav-ul">
                <li onClick={ondashbroad} ><i><MdOutlineDashboardCustomize /></i><p>Dashbroad</p></li>
                <li onClick={onFileUpload} ><i><MdOutlineCloudUpload /></i><p>UploadFiles</p></li>
                <li onClick={onFileView} ><i><FaRegFile /></i><p>ViewFiles</p></li>
                <li onClick={onEditFile} ><i><LuFileEdit /></i><p>EditFiles</p></li>
                <li onClick={onDeleteFile} ><i><MdOutlineDeleteSweep  /></i><p>DeleteFiles</p></li>
                <li onClick={onCircular} ><i><MdOutlineNotificationImportant  /></i><p>Circular</p></li>
                <li onClick={onNews} ><i><MdNewspaper  /></i><p>Newlets</p></li>
            </ul>
            <ul className="sidenav-ul">
                <li onClick={onLogout} ><i><MdLogout /></i><p>Logout</p></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default SideNav
