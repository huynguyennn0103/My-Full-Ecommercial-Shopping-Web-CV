import React, { useMemo } from 'react'
import './analytics.css'
import { userRequest } from '../../requestMethods'
import { useState, useEffect } from 'react'
import PieChartCustom from '../../components/pieChart/pieChart'
import BarChartCustom from '../../components/barChart/barChart'
import { useSelector } from 'react-redux'
const Analytics = () => {
    const[userStats, setUserStats] = useState()
    const[userStatsAnual, setUserStatsAnual] = useState()
    const[orderStatsWeek, setOrderStatWeek] = useState()
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
    const weekDay = useMemo(() =>[
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
      ],[])
    useEffect(() =>{
        const getOrderWeek =async() => {
            let res = await userRequest(TOKEN).get("/orders/stats?isWeekday=true")  
            const data = res.data.map((item) =>{
                return {
                    name: new Date(item._id).getDay(),
                    total_amount: item.total_amount
                }
            }).sort((a,b) => a.name - b.name)
            .map(item => {
                return{
                    name: weekDay[item.name],
                    total_amount: item.total_amount
                }
            })
            setOrderStatWeek(data)
        } 
        getOrderWeek()
    },[])
    
    useEffect(() =>{
        const getUserStats =async() => {
            let res = await userRequest(TOKEN).get("/users/stats?isMonday=true")  
            const data = res.data.map((item) =>{
                if(item._id){
                    return {
                        name: "Admin",
                        total: item.total
                    }
                }
                else{
                    return {
                        name: "User",
                        total: item.total
                    }
                }
            })
            setUserStats(data)
        } 
        getUserStats()
    },[])
    useEffect(() =>{
        const getUserStats =async() => {
            let res = await userRequest(TOKEN).get("/users/stats?isYear=true")  
            const data = res.data.map((item) =>{
                if(item._id){
                    return {
                        name: "Admin",
                        total: item.total
                    }
                }
                else{
                    return {
                        name: "User",
                        total: item.total
                    }
                }
            })
            setUserStatsAnual(data)
        } 
        getUserStats()
    },[])
    const Monday = () =>{
        var d = new Date()
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        d.setMinutes(0)
        d.setHours(0)
        d.setSeconds(1)
    return new Date(d.setDate(diff));
    }
    console.log(orderStatsWeek)
  return (
    <div className='analytics'>
       {userStats && 
       <div className='chart chart-pie non-shadow'>
        <PieChartCustom data = {userStats} title="Weekly User Analytics" dataKey="total" monday={Monday()}/>
        <PieChartCustom data = {userStatsAnual} title="Annually User Analytics" dataKey="total"/>
        </div>}
        <div className='chart'>
        {orderStatsWeek && <BarChartCustom data = {orderStatsWeek} title="Weekly Sale Analytics ($)" dataKey="total_amount" monday={Monday()}/>}
        </div>
    </div>
  )
}

export default Analytics
