import { useState ,useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { useNavigate } from 'react-router';
const Pay = ()=>{
    //after login payment => token
    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token)=>{
        setStripeToken(token)
    }
    const navigate = useNavigate()
    useEffect(()=>{
        const makeRequest = async()=>{
            try{
                //post to backend
               const res = await axios.post("http://localhost:5001/api/checkout/payment",{
                tokenId: stripeToken.id,
                amount: 2000
               })
               console.log(res.data)
               navigate('/success')
            }catch(err){
                console.log(err);
            }
        }
        stripeToken && makeRequest()
    },[stripeToken])
    const KEY = 'pk_test_51MWJXgGIeAhXm5iwkqmiL3tmI3my3Bgort08cXvnv3Kmgnl928kwZx9BgWW3JaVGIADoKN7Rxugm9ZF1HHupjpiC00Tu9MbLZv'
    return(
        <div style={
            {
                height:"100vh",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }
        }>
            {stripeToken? (<span>Processing. Please wait...</span>):
            <StripeCheckout name='BHIT. Shop' 
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqCtFQ7m_Wk2Ok2SSNcsD0QogUrXsqfG3_A&usqp=CAU'
            billingAddress
            shippingAddress
            description='Your total is $20'
            amount={2000}
            token={onToken}
            stripeKey= {KEY}
            >
            <button
            style={{
                border:"none",
                width: 120,
                borderRadius:5,
                padding:"20px",
                backgroundColor:"black",
                color: "white",
                fontWeight:"600",
                cursor:"pointer"
            }}>
                Pay Now
            </button>
            </StripeCheckout>
            }

        </div>
    )
}
export default Pay