import React, { useEffect, useState } from 'react';
import { AvForm,AvField } from 'availity-reactstrap-validation';
import { validation } from '../../utils/Common';
import Tooltip from '@material-ui/core/Tooltip';
import API from '../../utils/APICalling';
import { config } from '../../utils/APIUrl';
import {get} from 'lodash';
import ThankModal from '../../component/ThankModal';
import Loading from '../../component/Loading';

const Checkout = (props) => {
  let api = new API()
  let temp_products = JSON.parse(localStorage.getItem('products'))=== undefined || JSON.parse(localStorage.getItem('products'))=== null ? [] : JSON.parse(localStorage.getItem('products'))
  const [products,setProducts] = useState(temp_products)
  const [loading,setLoading] = useState(false)
  const [order_id,setOrderId] = useState(undefined)
  const [thankopen,setThankOpen] = useState(false)
  const [user_detail,setUserDetail] = useState({
    customer_name:"",mobile:"",email:"",address:"",landmark:"",
  })
  let total_amount =0
  
  
  useEffect(() => {
    JSON.parse(localStorage.getItem('products'))=== undefined || JSON.parse(localStorage.getItem('products'))=== null && props.history.push('/')
    products.forEach(element => {
      delete element.__v
      total_amount += element.price
    })
  },[])
  const handleChange = (e) => {
    setUserDetail({...user_detail,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async(e) => {
    setLoading(true)
    let result = await api.post(config.orderPost,{user_detail,products,total_amount})
    if(get(result,'status')===true){
      setLoading(false)
      setThankOpen(true)
      setOrderId(result.data.order_id)
      localStorage.clear()
  }else{
      setLoading(false)
    }
  }
  const handleContinue = () => {
    setThankOpen(false)
    props.history.push('/')
  }
    return ( 
        <>
           {
  /*================Billing Details Area =================*/
}
<>
<Loading loading={loading} />
<section className="billing_details_area p_100">
  <div className="container">
  <AvForm onValidSubmit={handleSubmit}>
    <div className="row">
      
      <div className="col-lg-7">
        <div className="main_title">
          <h2>Billing Details</h2>
        </div>
        <div className="billing_form_area">
        
         <div className="form-group col-md-12">
  <label htmlFor="first">Full Name *</label>
  <AvField
type={'text'}
name={'customer_name'}
value={user_detail.customer_name}
validate={{
  required: {
    value: true,
    errorMessage: `${`customer name`} is required`,
  },
}}
onChange={handleChange}
className="form-control mb-2"
id
placeholder={'Enter customer name'}
/>
</div>
  <div className="d-flex">
  <div className="col-md-6">
  <label htmlFor="email">Email Address *</label>
  <AvField
type={'email'}
name={'email'}
value={user_detail.email}
validate={{
  required: {
    value: true,
    errorMessage: `${`email`} is required`,
  },
  pattern:{
    value:validation.email,
    errorMessage:`Enter correct email`
  }
}}
onChange={handleChange}
className="form-control mb-2"
id
placeholder={'Enter Email'}
/>
</div>
<div className="col-md-6">
  <label htmlFor="phone">Phone *</label>
  <AvField
type={'number'}
name={'mobile'}
value={user_detail.mobile}
validate={{
  required: {
    value: true,
    errorMessage: `${`mobile`} is required`,
  },
 maxLength:{
   value:10,
   errorMessage:'mobile should be 10 digit'
 }
}}
onChange={handleChange}
className="form-control mb-2"
id
placeholder={'Enter mobile'}
/>
</div>

  </div>
<div className="form-group col-md-12">
  <label htmlFor="address">Address *</label>
  
<AvField
type="textarea" rows={4}
name={'address'}
value={user_detail.address}
validate={{
  required: {
    value: true,
    errorMessage: `${`address`} is required`,
  },
 
}}
onChange={handleChange}
className="form-control mb-2"
id
placeholder={'Enter address'}
/>

</div>
<div className="form-group col-md-12">
  <label htmlFor="address">Landmark *</label>
  
<AvField
type={'text'}
name={'landmark'}
value={user_detail.landmark}
validate={{
  required: {
    value: true,
    errorMessage: `${`landmark`} is required`,
  },
 
}}
onChange={handleChange}
className="form-control mb-2"
id
placeholder={'Enter landmark'}
/>
</div>
         
        </div>
      </div>
      <div className="col-lg-5">
        <div className="order_box_price">
          <div className="main_title">
            <h2>Your Order</h2>
          </div>
          <div className="payment_list">
            <div className="price_single_cost">
              <h5>
                Prodcut <span>Total</span>
              </h5>
              {products.map((data,index) => (
                <div key={index}>
                  <h5>
                {data.product_name} x {data.quantity} <span>₹{data.price}</span>
              </h5>
             
                </div>
              ))}
               <h3>
                Total <span>₹{total_amount} <Tooltip color="#000" title={<div style={{color:'#fff'}}>Delivery charges exclude(1km * 5rs)</div>} aria-label="add"><i className="fa fa-info-circle" style={{color:'grey'}} /></Tooltip></span>
              </h3>
            </div>
           
            <button type="submit" value="submit" className="btn pest_btn">
              place order
            </button>
          </div>
        </div>
      </div>
     
    </div>
    </AvForm>
  </div>
  <ThankModal openModal={thankopen}  handleContinue={handleContinue} order_id={order_id}/>
</section>
</>
{
  /*================End Billing Details Area =================*/
}
 
        </>
     );
}
 
export default Checkout;