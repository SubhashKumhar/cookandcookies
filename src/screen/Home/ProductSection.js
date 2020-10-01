import React from 'react';
import { Link } from 'react-router-dom';
import { updateProducts } from '../../utils/Common';
import { toast } from 'react-toastify';

const ProductSection = ({productList,category_name}) => {
  const updateProduct = (data) => {
    updateProducts(data,1,data.price)
    toast.success('product added to cart')
  }
    return ( 
        <>
         {
  /*================Welcome Area =================*/
}
<section className="welcome_bakery_area cake_feature_main ">
  <div className="container">
    <div className="main_title">
<h2>Our Featured {category_name}</h2>
      <h5>
        {" "}
        <Link to="/product">View All</Link>
      </h5>
    </div>
    <div className="cake_feature_row row">
      {productList.slice(0,8).map((data,index) => (
         <div key={index} className="col-lg-3 col-md-4 col-6">
         <div className="cake_feature_item">
           <Link to={`/product-detail/${data._id}`}>
             <div className="cake_img">
               <img src={data.image} className='productlist' alt={data.product_name} />
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
{
  /*================End Welcome Area =================*/
}
   
        </>
     );
}
 
export default ProductSection;