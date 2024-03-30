import React from 'react'
import Cam from "../../img/cam.png"
import Add from "../../img/add.png"
import More from "../../img/more.png"

import Messages from '../messages/Messages'
import Input from '../input/Input'
import { useSelector } from 'react-redux'

const Chat = () => {
    const data = useSelector(state => state.user)
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.chatUser?.username}</span>
        <div className="chatIcons">
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
        </div>
      </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chat