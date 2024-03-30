import './featuredInfo.css'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { format } from 'timeago.js';
import LiveTime from '../liveTime/LiveTime';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import { logout } from '../../redux/userRedux';
import { useDispatch } from 'react-redux';
import Loading from '../loading/Loading';
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux';
import axios from 'axios';
const FeaturedInfo = () => {
    const [income, setIncome] = useState([])
    const [perc, setPerc] = useState(0)
    const [userStat, setUserStat] = useState(null)
    const currentMonth = new Date().getMonth()
    const dispatch = useDispatch();
    const TOKEN = useSelector(state => state.user.currentUser.accessToken)
    const myUserRequest = () =>{
         let BASE_URL = "http://localhost:5001/api/"
        console.log("Token in featuredInfo", TOKEN)
        let myRequest = axios.create({
        baseURL: BASE_URL,
        headers: { token: `Bearer ${TOKEN}` },
        });
        return myRequest
    }
    useEffect(()=>{
        const getIncome = async ()=>{
            try {
                const res = await myUserRequest().get("orders/income")
                setIncome(res.data)
                setPerc(res.data.find((item) => item._id === (currentMonth + 1)).total* 100/ 
                res.data.find((item) => item._id === (currentMonth)).total-100)

            } catch (err) {
                if(err.response.status === 401){
                    dispatch(logout())
                  }
            }
        }
        getIncome()
    },[])
    useEffect(()=>{
        const getUserStats = async ()=>{
            try {
                const res = await myUserRequest().get("users/stats?isToday=true")
                setUserStat(res.data)

            } catch (err) {
                if(err.response.status === 401){
                    dispatch(logout())
                  }
            }
        }
        getUserStats()
    },[])
    // console.log(income)
    //  console.log(userStat)
  return (
    <div className='featured'>
        <div className="featuredItem">
            {income.length !== 0?
            <>
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">                   
                        <span className="featuredMoney">
                        ${                  
                            income.find((item) => item._id === (currentMonth + 1))?.total
                        }
                        </span>
                    

                <span className="featuredMoneyRate">
                    % {Math.floor(perc)}
                    {perc < 0? <ArrowDownwardIcon className='featuredIcon negative'/>: <ArrowUpwardIcon className='featuredIcon'/>}
                </span>
            </div> 
            <span className="featuredSub">Compared to last month</span>
            
            </>
            :
            <ReactLoading type={"bars"} color={"#555"} height={'36px'} width={'36px'}/>}
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">New Account</span>
            <div className="featuredUserContainer">
                {userStat && userStat.length === 2 && (userStat[0]._id?
                <>
                <span className="featuredUser"> <AdminPanelSettingsIcon style={{fontSize:'16px',marginRight:'4px'}}/> Admin: {userStat[0].total} <span className='time'>({format(userStat[0].newest)})</span></span>
                <span className="featuredUser">  <PersonIcon style={{fontSize:'16px',marginRight:'4px'}}/> User: {userStat[1].total} <span className='time'>({format(userStat[1].newest)})</span></span>
                </>
                :
                <>
                <span className="featuredUser"> <AdminPanelSettingsIcon style={{fontSize:'16px',marginRight:'4px'}}/> Admin: {userStat[1].total} <span  className='time'>({format(userStat[1].newest)})</span></span>
                <span className="featuredUser"> <PersonIcon style={{fontSize:'16px',marginRight:'4px'}}/> User: {userStat[0].total} <span className='time'>({format(userStat[0].newest)})</span></span>
                </>
                )
                }
                {userStat && userStat.length === 1 && (userStat[0]._id?
                <>
                <span className="featuredUser"> <AdminPanelSettingsIcon style={{fontSize:'16px',marginRight:'4px'}}/> Admin: {userStat[0].total} <span className='time'>({format(userStat[0].newest)})</span></span>
                <span className="featuredUser">  <PersonIcon style={{fontSize:'16px',marginRight:'4px'}}/> User: 0</span>
                </>
                :
                <>
                <span className="featuredUser"> <AdminPanelSettingsIcon style={{fontSize:'16px',marginRight:'4px'}}/> Admin: 0</span>
                <span className="featuredUser"> <PersonIcon style={{fontSize:'16px',marginRight:'4px'}}/> User: {userStat[0].total} <span className='time'>({format(userStat[0].newest)})</span></span>
                </>
                )

                }
            </div> 
            <hr />
            <span className="featuredSub">{userStat && userStat.length === 2 && ("Total: " + (userStat[0].total + userStat[1].total))}</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Today,</span>
            <div className="featuredTimeWeather">
                <LiveTime/>
                <WeatherInfo/>
            </div> 
        </div>
    </div>
  )
}

export default FeaturedInfo
 