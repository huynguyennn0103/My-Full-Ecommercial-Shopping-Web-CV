import './barChart.css'
import { useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,Tooltip } from 'recharts';
import ReactLoading from 'react-loading';
const BarChartCustom = ({title,data,dataKey,monday}) => {
  console.log(data)
  const colors = ['#011f4b', '#03396c', '#005b96', '#6497b1', '#a2d2df', '#baf2ef','#dcf3ff'];
const Day = useMemo(() =>[
  "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
],[])
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const CustomTooltip = ({active, payload, label }) => {
    if (active) {
      console.log(payload)
       return (
       <div
          className="custom-tooltip"
          style={{
             backgroundColor: "#ffff",
             padding: "5px",
             border: "1px solid #cccc"
          }}
       >
          <label>{`${payload[0].payload.name} : ${payload[0].payload.total_amount}$`}</label>
       </div>
    );
  }
  return null;
}
  return (
       <div className="chart-item-12">
         <h3 className='chartTitle'>{title}</h3>
    {data && data.length > 0?
        <>
      <BarChart
     width={1000}
     height={280}
     data={data}
     margin={{
       top: 20,
       right: 30,
       left: 20,
       bottom: 5,
     }}
   >
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="name" />
     <YAxis />
     <Bar dataKey={dataKey} fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
       {data.map((entry, index) => (
         <Cell key={`cell-${index}`} fill={colors[index % 20]} />
       ))}
     </Bar>
     <Tooltip content={<CustomTooltip/>}/>
   </BarChart>
   <h4>{monday? `Mon, ${monday.toLocaleDateString("en-US")} - ${Day[new Date().getDay()]}, ${new Date().toLocaleDateString("en-US")}`: new Date().getFullYear()}</h4>
   </>
   :<>
      <p style={{marginBottom: "50px"}}>Not found any data</p>
      <ReactLoading type={"bubbles"} color={"#555"} height={'36px'} width={'36px'} /> 
      <div style={{fontWeight: '100',marginTop:"4px"}}>Loading</div>
   </>}
   </div>
      
  )
}
export default BarChartCustom
