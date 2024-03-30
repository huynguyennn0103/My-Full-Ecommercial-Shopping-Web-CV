import React, {useContext, useState, useEffect } from "react";
import './topbar.css'
import { format } from 'timeago.js';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { SocketContext } from "../../context/Socket";
import { useSelector } from "react-redux";
const Topbar = () => {
  const socket = useContext(SocketContext)
  const currentUser = useSelector(state => state.user.currentUser)
  const [notiList, setNotiList] = useState([])
  const [showList, setShowList] = useState(false)
  useEffect(() =>{
    console.log("Socket in topbar")
    socket && socket.on("getNotiList", data =>{
      console.log("Data get in topbar: ", data);
      setNotiList(data.noti);
    })
    socket && socket.emit("firstLogin",{
      sender: currentUser,
    })
  },[socket])
  console.log(notiList)
  const handleRead = (id,e) =>{
    e.stopPropagation();
    socket.emit("readNoti",{
      sender: currentUser,
      id: id
    })
  }
  const handleDelete = (id,e) =>{
    e.stopPropagation();
    socket.emit("deleteNoti",{
      sender: currentUser,
      id: id
    })
  }
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
      <div className="topLeft">
        <span className="logo">
            bhitadmin
        </span>
      </div>
      <div className="topRight">
        <div className="topbarIconContainer" onClick = {() => setShowList((state) => !state)}>
            <NotificationsNoneOutlinedIcon/>
            <span className="topIconBadge">{notiList.reduce((store, element) =>{
                return element.isRead? store : store + 1
            },0)}</span>
            {showList && 
            <div className="noti-container">
              <div className="triangle"></div>
              <div className='noti-list1'>
                  {notiList.length > 0 && notiList.sort((a,b) => {return new Date(b.time) - new Date(a.time)}).map((item) =>
                  <p className="noti_item" style={item.isRead? {backgroundColor: '#9c1414'} : {backgroundColor: '#ff0000'}} onClick={(e) =>handleRead(item._id,e)}> New messages from {item.username}<button onClick={(e) =>{handleDelete(item._id,e)}}>x</button> <br /> {format(item.time)}</p>)                 
                  }
              </div>
            </div>
            }
        </div>
         <div className="topbarIconContainer">
            <LanguageOutlinedIcon/>
            <span className="topIconBadge">2</span>
        </div> 
          <Link to="/setting">
            <div className="topbarIconContainer">
            <SettingsIcon/>
            </div>
          </Link>
        <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
      </div>
      </div>
    </div>
  )
}

export default Topbar
