import React, {useRef,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {format} from "timeago.js"
const Message = ({message}) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const chatUser = useSelector(state => state.user.chatUser)
   const ref = useRef();
   useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser._id && "owner"}`}>
        <div className="messageInfo">
            <img src={message.senderId === currentUser._id? currentUser.img: chatUser.img} alt="" />
            <span>{format(message.date.toDate())}</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message
