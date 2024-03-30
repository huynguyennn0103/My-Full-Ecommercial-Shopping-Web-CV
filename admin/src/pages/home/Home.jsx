
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './home.css'
import { userData } from "../../dummyData";
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import {useState, useMemo, useEffect} from 'react'
import { userRequest } from '../../requestMethods';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Home = () => {
  // console.log("re-render-home")
    const TOKEN = useSelector(state => state.user.currentUser.accessToken)
    const myUserRequest = () =>{
    let BASE_URL = "http://localhost:5001/api/"
    console.log("Token in home", TOKEN)
    let myRequest = axios.create({
      baseURL: BASE_URL,
      headers: { token: `Bearer ${TOKEN}` },
    });
    return myRequest
    }
  const currentUser = useSelector(state => state.user.currentUser)
  const [userStats, setUserStats] = useState([])
  const MONTHS = useMemo(()=>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  ,[])
  useEffect(()=>{ 
    const getStats = async()=>{
      try {
        const res = await myUserRequest().get("/users/stats")
        let resActive = await myUserRequest().put(`/users/${currentUser._id}?isActive=true`)
        res.data.map(item=>{
          setUserStats(prev => [
            ...prev,
            {name: MONTHS[item._id-1], "Active User": item.total, _id: item._id}
          ])
        })
      } catch (error) {
        
      }
    }
    getStats()
  },[MONTHS,currentUser])
  console.log(userStats)
  return (
    <div className='home'>
      <FeaturedInfo/>
      <Chart data={userStats.sort((a,b)=>a._id - b._id)} title="User Analytics"grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  )
}

export default Home
