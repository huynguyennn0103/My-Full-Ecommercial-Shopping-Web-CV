import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { changeUserChat } from '../../redux/apiCalls';
const Chats = () => {
const [chats, setChats] = useState([]);
const users = useSelector(state => state.users.users)
console.log(users)
const currentUser = useSelector(state => state.user.currentUser)
const dispatch = useDispatch();
useEffect(() =>{
    const getChats = () =>{
        const unsub = onSnapshot(doc(db,"userChats",currentUser._id),(doc)=>{
            setChats(doc.data())
         })
    
    return () =>{
        console.log("Unsub onSnapShot chats")
        unsub();
    }
    }
    currentUser._id && getChats();
},[currentUser._id])
const handleSelect = (u) =>{
    changeUserChat(dispatch,u);
}
  return (
    <div className="chats">
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key = {chat[0]} onClick={() =>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.img} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.username}</span>
            <span>{users.some((item) => item.username === chat[1].userInfo.username && item.isActive)? 
            <span className='active-chat'></span>
            :
            <span className='inactive-chat'></span>}
            </span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats
