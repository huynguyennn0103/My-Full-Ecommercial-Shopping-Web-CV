import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import {useSelector} from "react-redux";
import Setting from "./pages/setting/Setting";
import TransactionList from "./pages/transactionList/TransactionList";
import Analytics from "./pages/analytics/Analytics";
import Mail from "./pages/mail/Mail";
import Message from "./pages/message/Message";
import Ratings from "./pages/rating/Rating";
import Calendars from "./pages/calendar/Calendar";
import Todo from "./pages/todo/Todo";
import ColorRedux from "./context/ColorRedux";
import Socket from "./context/Socket";
import Editor from "./pages/editor/Editor";
function App() {
  const admin = useSelector((state) => state.user.currentUser? state.user.currentUser.isAdmin: false);
  console.log(admin)
  // const admin = true
  return (
    <Router>
      <Switch>
        <Route path="/login">
            {!admin? <Login/> : <Redirect to= "/"/>}
        </Route>
        {admin?
        <>
        <Socket>
          <Topbar/>
      <div className="container">
        <Sidebar/>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/users">
            <UserList/>
          </Route>
          <Route path="/user/:userId">
            <User/>
          </Route>
          <Route path="/newUser">
            <NewUser/>
          </Route>
          <Route path="/products">
            <ProductList/>
          </Route>
          <Route path="/product/:productId">
            <Product/>
          </Route>
          <Route path="/newProduct">
            <NewProduct/>
          </Route>
          <Route path="/setting">
            <Setting/>
          </Route>
          <Route path="/transactions">
            <TransactionList/>
          </Route>
          <Route path="/analytics">
            <Analytics/>
          </Route>
          <Route path="/mail">
            <ColorRedux>
              <Mail/>
            </ColorRedux>
          </Route>  
          <Route path="/message">
              <Message/>
          </Route>
          <Route path="/rating">
             <Ratings/>
          </Route>
          <Route path="/calendar">
            <Calendars/>
          </Route>
          <Route path="/todo">
            <Todo/>
          </Route>
          <Route path="/editor">
            <Editor/>
          </Route>
      </div>
      </Socket>
          </>
          :
          <Redirect to="/login"/>
}
      
        </Switch>
    </Router>
  );
}

export default App;
