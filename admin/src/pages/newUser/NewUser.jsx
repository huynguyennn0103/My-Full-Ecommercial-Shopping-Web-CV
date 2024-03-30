import './newUser.css'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../../firebase';
import { addUser } from '../../redux/apiCalls';
import { Link } from 'react-router-dom';
const NewUser = () => {
  const dispatch = useDispatch()
  const[inputs, setInputs] = useState([])
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
  const[file, setFile] = useState(null)
  const handleChange = (e) =>{
      setInputs(prev =>{
        return{
          ...prev,
          [e.target.name] : e.target.value
        }
      })
  }
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
        const user_content = { ...inputs, img: downloadURL};
        // updateProduct(productId,product, dispatch);
        addUser(user_content,dispatch,TOKEN)
      });
    }
  );
  }
  else{
    const user_content = { ...inputs};
    addUser(user_content,dispatch,TOKEN)
  }
  }

console.log(inputs)
  return (
    <div className="newUser">
    <h1 className="newUserTitle">New User</h1>
    <form className="newUserForm" autoComplete='off'>
      <div className="newUserItem">
        <label>Username</label>
        <input name='username' type="text" placeholder="john" onChange={handleChange} required />
      </div>
      <div className="newUserItem">
        <label>Full Name</label>
        <input name = 'fullName' type="text" placeholder="John Smith" onChange={handleChange}/>
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <input name='email' type="email" placeholder="john@gmail.com" onChange={handleChange}/>
      </div>
      <div className="newUserItem">
        <label>Password</label>
        <input name='password' type="password" placeholder="password" onChange={handleChange} required/>
      </div>
      <div className="newUserItem">
        <label>Phone</label>
        <input name='phone' type="text" placeholder="+1 123 456 78" onChange={handleChange}/>
      </div>
      <div className="newUserItem">
        <label>Address</label>
        <input name='address' type="text" placeholder="New York | USA" onChange={handleChange}/>
      </div>
      {/* <div className="newUserItem">
        <label>Gender</label>
        <div className="newUserGender">
          <input type="radio" name="gender" id="male" value="male" />
          <label for="male">Male</label>
          <input type="radio" name="gender" id="female" value="female" />
          <label for="female">Female</label>
          <input type="radio" name="gender" id="other" value="other" />
          <label for="other">Other</label>
        </div>
      </div> */}
      <div className="newUserItem">
        <label>Set admin</label>
        <select className="newUserSelect" name="isAdmin" id="active" onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes" style={{color: "red", fontWeight:"bold"}}>Yes (Be careful)</option>
        </select>
      </div>
      <div className="newUserItem">
        <label for="file">Image File</label>
        <input onChange={e=>setFile(e.target.files[0])}  type="file" id="file"/> 
      </div>
      <div style={{width: "100%"}}></div>
      <button className="newUserButton" onClick={handleClick}><Link className='link' to="/users">Create</Link></button>
      
    </form>
  </div>
  )
}

export default NewUser
