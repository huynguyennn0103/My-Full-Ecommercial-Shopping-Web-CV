import React, {useContext, useState, useEffect } from "react";
import Img from "../../img/img.png";
import Attach from "../../img/attach.png";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context/Socket";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const socket = useContext(SocketContext)
  const currentUser = useSelector(state => state.user.currentUser)
  const chatId = useSelector(state => state.user.chatId)
  const chatUser = useSelector(state => state.user.chatUser)
  socket && console.log("Room socket", socket.room)
  useEffect(() =>{
    socket && socket.on("getNotification", data =>{// lang nghe moi thay doi cua getNotification
        console.log("Receive notification from: ", data)
        toast.info(`Notification:  Messages from ${data.sender.username}`, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        socket.emit("increaseNoti",{
          receiver: currentUser,
          sender: data.sender
        })
    })// chi can co thay doi tren socket.io ham nay tu duoc goi
  },[socket])
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL)
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser._id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({//update array
          id: uuid(),
          text,
          senderId: currentUser._id,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser._id), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatUser._id), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    console.log(currentUser)
    socket.emit("sendInputChat",{
      sender: currentUser,
      receiver: chatUser
    })
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
      <div>
      <ToastContainer
position="top-right"
autoClose={10000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      </div>
    </div>
  );
};

export default Input;