import './message.scss'
import SidebarChat from '../../components/sidebarChat/SidebarChat'
import Chat from '../../components/chat/Chat'
const Message = () =>{
    return(
        <div className='message'>
            <div className="homeChat">
                <div className="container">
                    <SidebarChat/>
                    <Chat/>
                </div>
            </div>
        </div>
    )
}
export default Message