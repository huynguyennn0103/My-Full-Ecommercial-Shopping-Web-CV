import './setting.css'
import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { log0ut } from '../../redux/apiCalls'
import {useHistory} from 'react-router-dom'
import { userRequest } from '../../requestMethods'
const Setting = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClick = async (e) =>{
    e.preventDefault();
    let resActive = await userRequest(currentUser.accessToken).put(`/users/${currentUser._id}?isActive=false`)
    log0ut(dispatch)
    history.push("/login")
  }
  return (
    <div className='setting'>
        <button className='signoutBtn' onClick = {handleClick}>
          Sign out
        </button>
    </div>
  )
}

export default Setting
