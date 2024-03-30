import './productList.css'
import { DataGrid} from '@mui/x-data-grid';
import { useEffect} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import { GridToolbarQuickFilter,GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport , GridToolbarColumnsButton,GridToolbarFilterButton} from '@mui/x-data-grid';
import Loading from '../../components/loading/Loading';
const ProductList = () => {
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
    const products = useSelector(state=>{
      return state.product.products
    })
    useEffect(()=>{
        getProducts(dispatch)
    },[dispatch])
    const handleDelete = (id) => {
      deleteProduct(id,dispatch,TOKEN)
    };
    const columns = [
      { field: "_id", headerName: "ID", width: 250 },
      {
        field: "title",
        headerName: "Product",
        valueGetter: (params) => params.row.title,
        width: 300,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" />
              <div className='MuiDataGrid-cellContent'>{params.row.title}</div>
            </div>
          );
        },
        sortComparator: (a,b) => a.localeCompare(b)
      },
      { field: "inStock", headerName: "Stock", width: 230 },
      {
        field: "price",
        headerName: "Price",
        width: 150,
      },
      {
        field: "action",
        headerName: "Action",
        width: 130,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutlineIcon
                className="productListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];
  
    return (
      products && products.length > 0 ?
      <div className="productList">
        <DataGrid
          
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row)=>row._id|| Math.floor(Math.random())}
          pageSize={8}
          checkboxSelection
          components={{
            Toolbar: customToolBar,
          }}
        />
      </div>:
      <Loading type="custom"/>
    );
}

export default ProductList
