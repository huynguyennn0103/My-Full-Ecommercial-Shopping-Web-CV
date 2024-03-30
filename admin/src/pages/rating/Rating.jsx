import React, { useState, useEffect } from 'react'
import './rating.css'
import Rating from '@mui/material/Rating';
import LinearProgress  from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { userRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
const Ratings = () => {
    const [stats, setStats] = useState();
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
    useEffect(() =>{
        const getData = async() =>{
            const res = await userRequest(TOKEN).get("/ratings/stats");
            setStats(res.data)
        }
        getData()
    }, [])
    const sum = stats && stats.reduce((store, element) =>{
        return store + element.total;
    },0)
    console.log(sum)
  return (
    <div className="rating">
      <div className="rating-container">
        <h1 className="main-title">
            Star Rating from customers
        </h1>
        {stats &&
          stats.map((item) => (
            <div className="rating-item" key={item._id}>
              <div className="rating-title">{item._id}-star</div>
              <div className="rating-star">
                <div className="rating-star-container">
                <Rating name="read-only" value={item._id}  />
                </div>
              </div>
              <div className="rating-count">
                {item.total}
              </div>
              <div className="rating-perc">
                <Box sx={{ width: "80%", color: "grey.500" }}>
                  <LinearProgress
                    // color="#a31414"
                    variant="determinate"
                    value={(item.total)/sum*100}
                  />
                </Box>
                <span className='content'>{Math.round((item.total)/sum*100)}%</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Ratings
