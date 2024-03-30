import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    //const [socket, setSocket] = useState(null)

  return (
    <div className='navbar'>
        <span className="logo">Admin Chat</span>
        <div className="user_chat">
            <img src={currentUser.img} alt="" />
            <span>{currentUser.username}</span>
        </div>
    </div>
  )
}

export default Navbar