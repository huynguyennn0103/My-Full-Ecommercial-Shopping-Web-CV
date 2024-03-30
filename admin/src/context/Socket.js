import React from 'react'
import {io} from "socket.io-client"
import { useEffect, createContext,useState} from 'react'
import { useSelector } from 'react-redux';
export const SocketContext = createContext();
const Socket = (props) => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
      setSocket(io("http://localhost:5003"))
    },[])
    useEffect(() =>{
      console.log("socket in useEffect", socket)
      socket && socket.emit("updateSender",{
        sender: currentUser,
      })
  },[socket, currentUser])
    console.log("socket connection: ", socket)
  return (
    <SocketContext.Provider value= {socket}>
        {props.children}
    </SocketContext.Provider>
  )
}

export default Socket
