import axios from "axios";
import { useSelector } from "react-redux";
// let TOKEN = localStorage.getItem('myCat')
console.log(window.location.href)
 let publicRequest = () =>{
   let BASE_URL = "http://localhost:5001/api/";
    return axios.create({
    baseURL: BASE_URL,
  });
 } 

 let userRequest = (TOKEN) =>{
  let BASE_URL = "http://localhost:5001/api/"
  // let user = JSON.parse(window.localStorage.getItem("persist:root"))?.user;
  // let currentUser = user && JSON.parse(user).currentUser;
  // let TOKEN = currentUser?.accessToken;
  console.log("Token in request", TOKEN)
  return axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });
 } 

export {publicRequest, userRequest}
