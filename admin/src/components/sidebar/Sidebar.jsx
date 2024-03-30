import './sidebar.css'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReportIcon from '@mui/icons-material/Report';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Sidebar = () => {
    const [active, setActive] = useState(1)
    const handleClick = (e) =>{
        setActive(e)
    }
    console.log(active)
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
                <Link to="/" className='link'>
                <li className={active === 1? "sidebarListItem active":"sidebarListItem"}  onClick={() => handleClick(1)}>
                    <LineStyleIcon className='sidebarIcon'/>
                    Home
                </li>
                </Link>
                <Link to="/analytics" className='link'>
                <li className={active === 2? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(2)}>
                    <TimelineIcon className='sidebarIcon'/>
                    Analytics
                </li>
                </Link>
                <Link to="/rating" className='link'>
                <li className={active === 3? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(3)}>
                    <TrendingUpIcon className='sidebarIcon'/>
                    Ratings
                </li>
                </Link>
            </ul>
        </div>
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Users</h3>
            <ul className="sidebarList">
                <Link to="/users" className='link'>
                <li className={active === 4? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(4)}>
                    <PermIdentityIcon className='sidebarIcon'/>
                    Users
                </li>
                </Link>
                <Link to="/newUser" className='link'>
                <li className={active === 5? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(5)}>
                    <PersonAddAlt1Icon/> 
                    <span style={{marginLeft: '3px'}}>New Users</span>
                </li>                  
                </Link>              
            </ul>
        </div>
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Product</h3>
            <ul className="sidebarList">
                <Link to="/newproduct" className='link'>
                <li className={active === 6? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(6)}>
                    <AddShoppingCartIcon/> 
                    <span style={{marginLeft: '3px'}}>New Products</span>
                </li>                  
                </Link>
                <Link to="/products" className='link'>
                <li className={active === 7? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(7)}>
                    <StorefrontIcon className='sidebarIcon'/>
                    Products
                </li>
                </Link>                
            </ul>
        </div>
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Transaction</h3>
            <ul className="sidebarList">
                <Link to="/transactions" className= 'link'>
                <li className={active === 8? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(8)}>
                    <AttachMoneyIcon className='sidebarIcon'/>
                    Transactions
                </li>
                </Link>
                
            </ul>
        </div>
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
                <Link to="/mail" className='link'>
                <li className={active === 9? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(9)}>
                    <MailOutlineOutlinedIcon className='sidebarIcon'/>
                    Mail
                </li>
                </Link>
                {/* <li className={active === 8? "sidebarListItem active":"sidebarListItem"}onClick={() => handleClick(8)}>
                    <DynamicFeedIcon className='sidebarIcon'/>
                    Feedback
                </li> */}
                <Link to="/message" className='link'>
                <li className={active === 10? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(10)}>
                    <ChatBubbleOutlineOutlinedIcon className='sidebarIcon'/>
                    Messages
                </li>
                </Link>
            </ul>
        </div>
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
                <Link to = "/todo" className = 'link'>
                <li className={active === 11? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(11)}>
                    <FormatListNumberedIcon className='sidebarIcon'/>
                    Todo
                </li>
                </Link>
                <Link to="/calendar" className='link'>
                <li className={active === 13? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(13)}>
                    <CalendarMonthIcon className='sidebarIcon'/>
                    Calendar
                </li>
                </Link>
                <Link to="/editor" className='link'>
                <li className={active === 12? "sidebarListItem active":"sidebarListItem"} onClick={() => handleClick(12)}>
                    <BorderColorIcon className='sidebarIcon'/>
                    Editor
                </li>
                </Link>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
