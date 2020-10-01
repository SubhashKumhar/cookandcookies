import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import SweetAlertBox from '../../component/sweetAlert';
import Loading from '../../component/Loading';
import { get } from 'lodash';

const Cart = (props) => {
  const [products,setProducts] = useState(JSON.parse(localStorage.getItem('products')) || [])
  let total_amount =0
  console.log(products,'products');
  products !==undefined && products.forEach(element => {
    total_amount += element.price
  })
  const [alertOpen,setAlertOpen] = useState(false)
  const [index,setIndex] = useState(undefined)
  const setQuantity = (index,quantity) => {
    let tempProduct = [...products]
    let fProduct = tempProduct[index]
    fProduct.quantity = quantity
    fProduct.price = parseInt(fProduct.quantity) * parseInt(fProduct.initial_price)
    setProducts(tempProduct)
  }
  const setAlertOpenFunc = (_id=undefined) => {
    
    setAlertOpen(!alertOpen)
    setIndex(_id)
  }

  const gotoCheckout = () => {
    localStorage.setItem('products',JSON.stringify(products))
    props.history.push('/checkout')
  }

  const handleDelete = () => {
   
   products.splice(index,1)
   setProducts(products)
   localStorage.setItem('products',JSON.stringify(products))
   setAlertOpenFunc()
  }
    return ( 
        <>
            <div>
  {/*================End Main Header Area =================*/}
  <section className="banner_area">
    <div className="container">
      <div className="banner_text">
        <h3>Cart</h3>
      </div>
    </div>
  </section>
  {/*================End Main Header Area =================*/}
  {/*================Cart Table Area =================*/}
  <section className="cart_table_area p_100">
    <div className="container">
      {products.length !==0 ?
      <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
           
           { products.map((data,index) => (
              <tr key={index}>
              <td>
                <img
                  src={data.image}
                  alt={data.image}
                  width={120}
                />
              </td>
              <td>{data.product_name}</td>
           <td>₹{data.initial_price}</td>
              <td>
              <input type="number" min="1" style={{width:'43px'}} placeholder={1} id="quantity" value={data.quantity} onChange={(e) => setQuantity(index,e.target.value)}/>
              </td>
              <td>₹{data.price}</td>
              <td className="cursor-pointer" onClick={() => setAlertOpenFunc(index)}><i className="fa fa-times"/></td>
            </tr>
           )) }
          </tbody>
        </table>
      </div>
      <div className="row cart_total_inner">
        <div className="col-lg-7" />
        <div className="col-lg-5">
          <div className="cart_total_text">
            <div className="cart_head">Cart Total</div>
            <div className="total">
              <h4>
                Total <span>₹{total_amount} <Tooltip color="#000" title={<div style={{color:'#fff'}}>Delivery charges exclude(1km * 5rs)</div>} aria-label="add"><i className="fa fa-info-circle" style={{color:'grey'}} /></Tooltip></span>
              </h4>
            </div>
            <div className="cart_footer">
              <a className="pest_btn cursor-pointer" onClick={gotoCheckout}>
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
   </> : <div className="text-center"><span>No item in cart</span></div>}
    </div>
  </section>
  {/*================End Cart Table Area =================*/}
</div>
<SweetAlertBox open={alertOpen} onConfirm={handleDelete} onCancel={setAlertOpenFunc} />

        </>
     );
}
 
export default Cart;