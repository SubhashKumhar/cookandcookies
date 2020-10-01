import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/APICalling';
import { config } from '../../utils/APIUrl';
import {get} from 'lodash';
import { fade } from '@material-ui/core';
import { updateProducts } from '../../utils/Common';
import Loading from '../../component/Loading';
import { toast } from 'react-toastify';

const Product = () => {
  let api = new API()
  const [categoryList,setCategoryList] = useState([])
  const [activeCategory,setActiveCategory] = useState('all')
  const [productList,setProductList] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
getProductList()
getCategoryList()
  },[])
  const getProductList = async(product_cat='all',category_name='all') => {
    setLoading(true)
    setActiveCategory(category_name)
    let result = await api.get(config.productList,true,{product_cat})
    if(get(result,'status')===true){
        setProductList(get(result,'data',[]))
        setLoading(false)
      }else{
        setLoading(false)
      }
}
const getCategoryList = async() => {
  setLoading(true)
  let result = await api.get(config.categoryList,false)
  if(get(result,'status')===true){
    setLoading(false)
      setCategoryList(get(result,'data',[]))
    }else{
      setLoading(false)
    }
}
const updateProduct = (data) => {
  updateProducts(data,1,data.price)
  toast.success('product added to cart')
}
    return ( 
        <>
         <Loading loading={loading}/>
            <div>
  {/*================End Main Header Area =================*/}
  <section className="banner_area">
    <div className="container">
      <div className="banner_text">
        <h3>All Products</h3>
        {/* <ul>
  				<li><a href="index.html">Home</a></li>
  				<li><a href="portfolio.html">Portfolio</a></li>
  			</ul> */}
      </div>
    </div>
  </section>
  {/*================End Main Header Area =================*/}
  {/*================Portfolio Area Area =================*/}
  <section className="portfolio_area p_100">
    <div className="container">
      <div className="portfolio_filter">
        <ul className="list_style">
          <li className={activeCategory==='all' ? 'active' : ''} data-filter="*">
            <a className="cursor-pointer" onClick={() => getProductList()}>All</a>
          </li>
          {categoryList.map((data,index) => (
             <li key={index} className={activeCategory===data.category_name ? 'active' : ''} data-filter="*">
             <a className="cursor-pointer" onClick={() => getProductList(data._id,data.category_name)}>{data.category_name}</a>
           </li>
          ))}
        </ul>
      </div>
      <div className="row grid_portfolio_area imageGallery1">
      {productList.map((data,index) => (
         <div key={index} className="col-lg-3 col-md-4 col-6">
         <div className="cake_feature_item">
           <Link to={`/product-detail/${data._id}`}>
             <div className="cake_img">
               <img src={data.image} alt={data.product_name} className="productlist"/>
             </div>
           </Link>
           <div className="cake_text">
      <h4>₹{data.price}</h4>
             <h3>{data.product_name}</h3>
             <div onClick={() => updateProduct(data)} className="pest_btn cursor-pointer">
               Add to cart
             </div>
           </div>
         </div>
       </div>
      
      ))}
        </div>
    </div>
  </section>
  {/*================End Portfolio Area Area =================*/}
</div>
        </>
     );
}
 
export default Product;