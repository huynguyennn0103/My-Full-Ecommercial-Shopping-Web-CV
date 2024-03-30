import './user.css'
import { Link , useLocation} from "react-router-dom";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../../firebase';
import { updateUser } from '../../redux/apiCalls';
import {format} from "timeago.js"

const User = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const userId = location.pathname.split("/")[2]
  const[inputs, setInputs] = useState({})
  const user= useSelector(state => state.users.users.find(user => user._id === userId))
  const[file, setFile] = useState(null)
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
  const handleChange = (e) =>{
    setInputs((prev) =>{
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  } 
  console.log(inputs)
  const handleClick = (e) =>{
    e.preventDefault();
    if(file){
    const fileName = new Date().getTime() + file.name;// unique name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //just for observe
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const user_content = { ...inputs, img: downloadURL, password: user.password};
          console.log(user_content)
          updateUser(userId,user_content, dispatch,TOKEN);
        });
      }
      
    );
    }
    else{
      const user_content = { ...inputs, password: user.password};
          console.log(user_content)
          updateUser(userId,user_content, dispatch,TOKEN);
    }
}
  return (
<div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img ||"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullName || "Missing_name"}</span>
              {/* <span className="userShowUserTitle">Software Engineer</span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username + (user.isAdmin?" (Admin)":" (User)")}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{format(user.createdAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone||"not valid"}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address || "VN"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={user.fullName || "Missing_name"}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name='phone'
                  placeholder={user.phone||"not valid"}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name='address'
                  placeholder={user.address || "VN"}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Set admin</label>
                <select name="isAdmin" id="isAdmin" onChange = {handleChange}>
                  <option selected="selected" disabled>--set admin--</option>
                    <option value="false" >No</option>
                    <option value="true" style={{color: "red", fontWeight: "bold"}}>Yes (Be careful)</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img ||"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input onChange={e=>setFile(e.target.files[0])}  type="file" id="file" style={{ display: "none" }} />
              </div>
              
              <button className="userUpdateButton" onClick={handleClick}><Link className="userUpdateButton"  style={{textDecoration: "none"}}to="/users">Update</Link></button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User
