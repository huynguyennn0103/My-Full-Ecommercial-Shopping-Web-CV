import axios from "axios";
let BASE_URL = "http://localhost:5001/api/"
let user = JSON.parse(localStorage.getItem("persist:root"))?.user;
let currentUser = user && JSON.parse(user).currentUser;
let TOKEN = currentUser?.accessToken;
// const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdlYTJjMTBiY2ViZDhmZWZlMDFhZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzU0MzU5MjgsImV4cCI6MTY3NTY5NTEyOH0.wsTI2mMGr9f6ObM_9kQNqRcoc-FG1M6nxWvCQteg7uU"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});