import './widgetSm.css'
import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userRequest } from '../../requestMethods';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import { useSelector } from 'react-redux';
const WidgetSm = () => {
  const [users, setUsers] = useState([])
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
  useEffect(()=>{
    const getUsers = async () =>{
      try {
        const res = await userRequest(TOKEN).get("users/?new=true")
        setUsers(res.data)
      } catch (error) {       
      }
    }
    getUsers()
  },[])
  return (
<div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      {users && users.length > 0? 
      <ul className="widgetSmList">
        {users.map(user => (
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img ||"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
          <Link to={`user/${user._id}`}>
            Display
          </Link>
          </button>
          </li>
        ))}
        
      </ul>
      :
      <Loading type="circle"/>
      }
    </div>
  )
}

export default WidgetSm
