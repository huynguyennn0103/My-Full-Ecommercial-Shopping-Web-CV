import React, { useState } from 'react'
import './calendar.css'
import Calendar from 'react-calendar'
const Calendars = () => {
    const [date,setDate] = useState(new Date())
    const onChange = date =>{
        setDate(date)
    }
  return (
    <div className='calendars'>
      <Calendar onChange={onChange} value={date}/>
    </div>
  )
}

export default Calendars
