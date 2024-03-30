import './pieChart.css'
import { PieChart, Pie,Sector , Cell, ResponsiveContainer, Legend ,Tooltip} from 'recharts';
import { useMemo } from 'react';
import ReactLoading from 'react-loading';
const PieChartCustom = ({title,data,dataKey,monday}) => {
  const COLORS = [ '	#b94343', '#ff7676'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const Day = useMemo(() =>[
  "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
],[])
const CustomTooltip = ({ active, payload, label }) => {
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
        <label>{`${payload[0].name} : ${payload[0].value}`}</label>
     </div>
  );
}
return null;
};
  return (
    
      <div className="chart-item-6">
        <h3 className='chartTitle'>{title}</h3>
        {data && data.length > 0?
        <>
       <h4>{monday? `Mon, ${monday.toLocaleDateString("en-US")} - ${Day[new Date().getDay()]}, ${new Date().toLocaleDateString("en-US")}`: new Date().getFullYear()}</h4>
        <ResponsiveContainer width="50%" >
        <PieChart >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend/>
          <Tooltip content={<CustomTooltip/>}/>
        </PieChart>
      </ResponsiveContainer>
      </>
      :
      <>     
      <p style={{marginBottom: "50px"}}>Not found any data</p>
      <ReactLoading type={"spinningBubbles"} color={"#555"} height={'35px'} width={'35px'} /> 
      <div style={{fontWeight: '100'}}>Loading</div>
      </>
      
      }
    </div>
  )
}

export default PieChartCustom
