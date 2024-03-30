import './transactionList.css'
import { DataGrid} from '@mui/x-data-grid';
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { userRequest } from '../../requestMethods';
import { format } from 'timeago.js';
import { logout } from '../../redux/userRedux';
import { useDispatch } from 'react-redux';
import { GridToolbarQuickFilter,GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport , GridToolbarColumnsButton,GridToolbarFilterButton} from '@mui/x-data-grid';
import Loading from '../../components/loading/Loading';
import { useSelector } from 'react-redux';
const TransactionList = () => {
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
  const customToolBar = () =>{
    return(
    <GridToolbarContainer>
       <GridToolbarColumnsButton className='tool'/>
      <GridToolbarFilterButton className='tool'/>
      <GridToolbarDensitySelector className='tool'/>
      <GridToolbarExport className='tool'/>
      <GridToolbarQuickFilter className='tool-search'/>
    </GridToolbarContainer>
    )
    }
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const getOrders = async () =>{
          try {
            const res = await userRequest(TOKEN).get("/orders?joinUser=true");
            setOrders(res.data)
          } catch (err) {
            if(err.response.status === 401){
              // dispatch(logout())
            }
          }

        }
        getOrders()
    },[])
    console.log(orders)
    const columns = [
      { field: "_id", headerName: "ID", width: 250 },
      {
        field: "amount",
        headerName: "Amount",
        width: 130,
      },
      { field: "status", headerName: "Status", width: 120 },
      {
        field: 'products',
        headerName: "Products",
        valueGetter: (params) => params.row.products.length,
        width:230,
        renderCell: (params)=>{
            return(
                <> 
                {params.row.img_arr.map((img, index) =>{
                  return(
                      <div className="transactionListItem"> 
                      <span className="transactionListImg img-icon quantity" >{params.row.quantity[index]}</span>
                      <img className="transactionListImg img-icon img" src={img[0]} alt="" />
                      </div>
                    )
                    })
                }
                </>
            )
                
        },
        sortComparator: (a,b) => a-b
      },
      {
        field: "createdAt",
        headerName: "Time",
        width: 150,
        renderCell:(params)=>{
            return <div className='MuiDataGrid-cellContent'>{format(params.row.createdAt)}</div>
        }
      },

      {
        // field: (params) => params.row.user_info[0].username,
        field: 'username',
        headerName: "Username",
        valueGetter: (params) => {return params.row.user_info[0].username},
        width:180,
        renderCell: (params)=>{
            return (
              <>
                <div className="transactionListItem">
                  <img
                    className="transactionListImg"
                    src={params.row.user_info[0].img}
                    alt=""
                  />
                  <span className='MuiDataGrid-cellContent'>{params.row.user_info[0].username}</span>
                </div>
              </>
            );
                
              },
               filterRenderedCellData: true,
          sortComparator: (a,b) => a.localeCompare(b)
      }
    ];
//   console.log(orders)
    return (
      orders && (orders.length > 0)?       
        <div className="transactionList">
        <DataGrid
          
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row)=>row._id|| Math.floor(Math.random())}
          pageSize={8}
          checkboxSelection
          components={{
            Toolbar: customToolBar,
          }}
        />
      </div>
      : 
      <Loading type="custom"/>
    )

    
  
}

export default TransactionList

