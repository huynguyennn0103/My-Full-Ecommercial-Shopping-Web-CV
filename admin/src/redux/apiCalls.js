import { loginFailure, loginStart, loginSuccess, logout,changeUser } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods.js";
import axios from "axios";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,

} from "./productRedux";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
  addUsersStart,
  addUsersSuccess,
  addUsersFailure,
} from "./usersRedux"
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    let res = await axios.post("http://localhost:5001/api/auth/login", user);
    let resChat = await getDoc(doc(db,"userChats", res.data._id))
    if(!resChat.exists()){
      await setDoc(doc(db,"userChats",res.data._id),{})// create document with id: res.data._id in collection userChats
    }
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const changeUserChat = async (dispatch, data) =>{
  dispatch(changeUser(data));
}

export const getProducts = async (dispatch) => {
  console.log("hello")
  dispatch(getProductStart());
  try {
    let res = await publicRequest().get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    if(err.response.status === 401){
      dispatch(logout())
  }
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch, TOKEN) => {
  dispatch(deleteProductStart());
  try {
    let res = await userRequest(TOKEN).delete(`/products/${id}`); //=> don't want to delete real
    // console.log(res)
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    if(err.response.status === 401){
      dispatch(logout())
  }
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch,TOKEN) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest(TOKEN).put(`/products/${id}`,product);
    dispatch(updateProductSuccess({ id, product }));// not update real
  } catch (err) {
    if(err.response.status === 401){
      dispatch(logout())
  }
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch,TOKEN) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest(TOKEN).post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    if(err.response.status === 401){
      dispatch(logout())
    }
    dispatch(addProductFailure());
  }
};
//-----------------------------------Users---------------------------------------------
export const getUsers = async (dispatch,TOKEN) => {
  dispatch(getUsersStart());
  try {
    let res = await userRequest(TOKEN).get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    if(err.response.status === 401){
        dispatch(logout())
        // window.location.href = '/login.html'
    }
    else{
    dispatch(getUsersFailure());
    }
    // console.log(err.response)
  }
};

export const deleteUser = async (id, dispatch,TOKEN) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest(TOKEN).delete(`/users/${id}`); //=> don't want to delete real
    // console.log(res)
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    if(err.response.status === 401){
      // dispatch(logout())
  }
    dispatch(deleteUsersFailure());
  }
};

export const updateUser = async (id, user, dispatch,TOKEN) => {
  dispatch(updateUsersStart());
  try {
    // update
    const res = await userRequest(TOKEN).put(`/users/${id}`,user);
    dispatch(updateUsersSuccess({ id, user }));// not update real
  } catch (err) {
    if(err.response.status === 401){
      dispatch(logout())
  }
    dispatch(updateUsersFailure());
  }
};
export const addUser = async (user, dispatch,TOKEN) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest(TOKEN).post(`/auth/register`, user);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    if(err.response.status === 401){
      dispatch(logout())
  }
    dispatch(addProductFailure());
  }
};

//----------------logout-----------------
export const log0ut = async (dispatch) =>{
  dispatch(logout())
}