import './userList.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/apiCalls';
import { GridToolbarQuickFilter,GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport , GridToolbarColumnsButton,GridToolbarFilterButton} from '@mui/x-data-grid';
const UserList = () => {
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
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
    useEffect(()=>{
      getUsers(dispatch,TOKEN)
    },[dispatch])

    const handleDelete = (id)=>{
        deleteUser(id,dispatch,TOKEN)
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'username', headerName: 'User', width: 300, renderCell: (params) =>{
            return(<div className='userListUser'>
                <img className='userListImg' src={params.row.img|| "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" } alt=""></img>
                <div className='MuiDataGrid-cellContent'>{params.row.username}</div>
            </div>)
        } },
        { field: 'email', headerName: 'Email', width: 230 },
        {
            field: 'isAdmin',
            headerName: 'Admin',
            width: 150,
            renderCell:(params) =>{
              return (params.row.isAdmin? <span style= {{color:"#ec1010", fontWeight:"bold"}}>admin</span>
              : <span style= {{fontWeight:"bold"}}>user</span>)
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell:(params) =>{
                return(
                    <>
                    <Link to={"/user/"+params.row._id}>
                    <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutlineIcon className="userListDelete" onClick={() =>handleDelete(params.row._id)}/>
                    </>
                )
            }
            // {id: 1, field: 'action', row: {…}, rowNode: {…}, colDef: {…}, …} <= params
        }

      ];

  return (
    <div className='userList'>
      <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        disableSelectionOnClick
        rows={users}
        columns={columns}
        pageSize={8}
        getRowId={(row)=>row._id}
        // rowsPerPageOptions={[5]}
        checkboxSelection
        components={{
          Toolbar: customToolBar,
        }}
      />
    </div>
    </div>
  )
}

export default UserList
