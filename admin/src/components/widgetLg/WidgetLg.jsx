import './widgetLg.css'
import { useState, useEffect } from 'react'
import { userRequest } from '../../requestMethods'
import {format} from "timeago.js"
import Loading from '../loading/Loading'
import { useSelector } from 'react-redux'
const WidgetLg = () => {
  const [orders, setOrders] = useState([])
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
  useEffect(()=>{
    const getOrders = async () =>{
      try {
        const res = await userRequest(TOKEN).get("orders")
        setOrders(res.data)
      } catch (error) {       
      }
    }
    getOrders()
  },[])
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  console.log()
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      {orders && orders.length > 0? 
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.sort((a,b) => {return new Date(b.createdAt) - new Date(a.createdAt)}).slice(0,6).map(order =>(
          <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            {/* <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            /> */}
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">{order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
        ))}
        
      </table>
      : <Loading type = "circle"/>}
    </div>
  );
}

export default WidgetLg

