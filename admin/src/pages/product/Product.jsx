import './product.css'
import { Link, useLocation } from 'react-router-dom'
import Chart from "../../components/chart/Chart"
import PublishIcon from '@mui/icons-material/Publish';
import {useSelector} from 'react-redux'
import { useState,useMemo,useEffect } from 'react';
import { userRequest } from '../../requestMethods';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../../firebase';
import {useDispatch} from 'react-redux'
import { updateProduct } from '../../redux/apiCalls';
const Product = () => {
    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const [pStats, setPStats] = useState([])
    const [inputs, setInputs] = useState({})
    const[file, setFile] = useState(null)
    const dispatch = useDispatch();
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken)
    const handleChange = (e)=>{
        setInputs((prev) =>{ return {
            ...prev,
        [e.target.name]: e.target.value
        }})
    }
    const handleClick = (e) =>{
        e.preventDefault();
        if(file){
        const fileName = new Date().getTime() + file.name;// unique name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //just for observe
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              const product = { ...inputs, img: downloadURL};
              updateProduct(productId,product, dispatch,TOKEN);
            });
          }
        );
        }
        else{
          const product = { ...inputs};
          console.log(product)
          updateProduct(productId,product, dispatch,TOKEN);
        }
    }
    console.log(inputs)
    const MONTHS = useMemo(()=>
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
    ,[])
    useEffect(()=>{
        const getStats = async()=>{
          try {
            const res = await userRequest(TOKEN).get("orders/income?pid=" + productId)
            const list = res.data.sort((a,b) => {
                return a._id - b._id
            })
            list.map(item=>{
              setPStats(prev => [
                ...prev,
                {name: MONTHS[item._id-1], Sales: item.total}
              ])
            })
          } catch (error) {
            
          }
        }
        getStats()
      },[MONTHS, productId])
    
    const product = useSelector(state => state.product.products.find(product => product._id === productId))
  return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Product</h1>
      <Link to="/newproduct">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
    <div className="productTop">
        <div className="productTopLeft">
            <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
        </div>
        <div className="productTopRight">
            <div className="productInfoTop">
                <img src={product.img} alt = "" className="productInfoImg" />
                <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id: </span>
                    <span className="productInfoValue">{product._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">sales: </span>
                    <span className="productInfoValue">5123</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">in stock: </span>
                    <span className="productInfoValue">{`${product.inStock}`}</span>
                </div>
            </div>
        </div>
    </div>
    <div className="productBottom">
        <form className="productForm">
            <div className="productFormLeft">
                <label>Product Name</label>
                <input name="title" type="text" placeholder={product.title} onChange = {handleChange}/>
                <label>Product Description</label>
                <input name="desc" type="text" placeholder={product.desc} onChange = {handleChange}/>
                <label>Price</label>
                <input name="price" type="number" placeholder={product.price} onChange = {handleChange}/>
                <label>In Stock</label>
                <select name="inStock" id="idStock" onChange = {handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    <img src={product.img} alt="" className="productUploadImg" />
                    <label for="file">
                        <PublishIcon/>
                    </label>
                    <input onChange={e=>setFile(e.target.files[0])}  type="file" id="file" style={{display:"none"}} />
                </div>
                <button className="productButton" onClick={handleClick}>Update</button>
            </div>
        </form>
    </div>
  </div>
  )
}

export default Product
