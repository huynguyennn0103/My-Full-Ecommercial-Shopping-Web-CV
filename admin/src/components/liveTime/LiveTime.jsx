
import React, { useState, useEffect } from "react";
const LiveTime = () => {
    let time = new Date().toLocaleString();
    const [cTime, setTime] = useState();
    useEffect(() => {
        // console.log("time")
      let x = setInterval(() => {
        setTime(time);
      }, 1000);
      return () => {clearInterval(x)}
    },[cTime]);
    //  console.log(cTime)
    return (
        <div className="featuredTime">{cTime}</div>
    );
}

export default LiveTime
