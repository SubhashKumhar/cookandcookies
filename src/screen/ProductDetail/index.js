import React, { useState, useEffect } from 'react';
import API from '../../utils/APICalling';
import { config } from '../../utils/APIUrl';
import {get} from 'lodash';
import { updateProducts } from '../../utils/Common';
import Loading from '../../component/Loading';
import { toast } from 'react-toastify';

const ProductDetail = (props) => {
  let api = new API()
  const [productDetail,setProductDetail] = useState({})
  const [quantity,setQuantity] = useState(1)
  const [loading,setLoading] = useState(false)
let _id = props.match.params.id
  useEffect(() => {
    getProductDetail()
  },[])

  const getProductDetail = async() => {
    setLoading(true)
    let result = await api.get(config.productDetail,true,{_id})
    if(get(result,'status')===true){
      setProductDetail(get(result,'data',{}))
      setLoading(false)
  }else{
    setLoading(false)
  }
  }
  const updateProduct = (data) => {

    updateProducts(data,parseInt(quantity),data.price)
    toast.success('product added to cart')
    props.history.push('/product')
  }
    return ( 
        <>
         <Loading loading={loading}/>
            <div>
  {/*================End Main Header Area =================*/}
  <section className="banner_area">
    <div className="container">
      <div className="banner_text">
        <h3>Product Detail</h3>
      </div>
    </div>
  </section>
  {/*================End Main Header Area =================*/}
  {/*================Product Details Area =================*/}
  <section className="product_details_area p_100">
    <div className="container">
      <div className="row product_d_price">
        <div className="col-lg-6">
          <div className="product_img">
            <img
              className="img-fluid" style={{height:'100%',maxHeight:'400px',width:"100%",maxWidth:'480px'}}
              src={productDetail.image}
              alt
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product_details_text">
            <h4>{productDetail.product_name}</h4>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequ untur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est,{" "}
            </p>
            <h5>
    Price :<span>₹{parseInt(quantity) * productDetail.price}</span>
            </h5>
            <div className="quantity_box">
              <label htmlFor="quantity">Quantity :</label>
              <input type="number" placeholder={1} id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>
            <div onClick={() => updateProduct(productDetail)} className="pest_btn cursor-pointer">
               Add to cart
             </div>
          </div>
        </div>
      </div>
      {/* <div className="product_tab_area">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="nav-home-tab"
              data-toggle="tab"
              href="#nav-home"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Descripton
            </a>
            <a
              className="nav-item nav-link"
              id="nav-profile-tab"
              data-toggle="tab"
              href="#nav-profile"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Specification
            </a>
            <a
              className="nav-item nav-link"
              id="nav-contact-tab"
              data-toggle="tab"
              href="#nav-contact"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Review (0)
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum
            </p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum
            </p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum
            </p>
          </div>
        </div>
      </div>
    */}
    </div>
  </section>
  {/*================End Product Details Area =================*/}
</div>
        </>
     );
}
 
export default ProductDetail;