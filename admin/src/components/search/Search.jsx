import React from 'react'
import { useState } from 'react'
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';
const Search = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const [username,setUsername] = useState("")
    const [user,setUser] = useState(null)
    const [err, setErr] = useState(false)
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
    const handleSearch = async () =>{
        try {
            const res = await userRequest(TOKEN).get(`users/findName?username=${username}`)
            setUser(res.data);
        } catch (error) {
            setErr(true);
        }
    }
    const handleKey = e =>{
        e.code === "Enter" && handleSearch();
    }
    console.log("Chat User", user)
    console.log("Chat User Name",username)
    const handleSelect = async() =>{
        //check whether the group(chats in firestore) exists, if not create
        //create id of chats depends on 2 members in conversation
        const combinedId = currentUser._id > user._id? currentUser._id + user._id : user._id + currentUser._id;
        try {          
            const res = await getDoc(doc(db, "chats", combinedId))
            console.log("checkExist",res.exists())
            //if not exists chat between them
            if(!res.exists()){
                //create chats
                console.log("hello")
                await setDoc(doc(db,"chats",combinedId),{messages: []})//create document with id: combinedId in collection chats with field: messages:[]
                //create user chats
                const response = await updateDoc(doc(db, "userChats", currentUser._id), {//create
                    [combinedId + ".userInfo"]: {// update or create props of field combinedId
                      _id: user._id,
                      username: user.username,
                      img: user.img? user.img : "https://firebasestorage.googleapis.com/v0/b/shop-2c3d6.appspot.com/o/1675590571380avatar.jpg?alt=media&token=0f86ee96-0600-467b-83d0-3d4484c3bd7e",
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                  });
                  console.log(response)
                  await updateDoc(doc(db, "userChats", user._id), {
                    [combinedId + ".userInfo"]: {
                      _id: currentUser._id,
                      username: currentUser.username,
                      img: currentUser.img,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                  });

            }
        } catch (error) {
            
        }
        setUser(null);
        setUsername("")
    }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} 
        value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick = {handleSelect}>
          <img src={user.img} alt="" />
          <div className="userChatInfo">
            <span>{user.username}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
