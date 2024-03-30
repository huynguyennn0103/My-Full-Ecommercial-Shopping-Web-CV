import './chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../loading/Loading';
const Chart = ({title,data,dataKey,grid}) => {

  return (
    <div className='chart'>
       <h3 className='chartTitle'>{title}</h3>
       {data && data.length > 0? 
       <ResponsiveContainer width="100%" aspect={4/1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#ff0000"/>
                <Line type="monotone" dataKey={dataKey} stroke="#272727"/>
                <Tooltip/>
                { grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
            </LineChart> 
       </ResponsiveContainer>
       : <Loading type="custom"/>}
    </div>
  )
}

export default Chart
