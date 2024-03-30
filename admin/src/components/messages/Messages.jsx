import React, { useEffect } from 'react'
import Message from '../message/Message'
import { useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
const Messages = () => {
    const [messages, setMessages] = useState([]);
    const data = useSelector(state => state.user)
    useEffect(() =>{
        const unsub = onSnapshot(doc(db,"chats", data.chatId?data.chatId : "null" ),(doc) =>{
            doc.exists() && setMessages(doc.data().messages)
        })
        return () =>{
            unsub();
        }
    },[data.chatId])
console.log(messages)
console.log(data)
  return (
    <div className='messages'>
        {messages.map(message =>(
            <Message message={message} key = {message.id}/>
        ))}
    </div>  
  )
}

export default Messages
