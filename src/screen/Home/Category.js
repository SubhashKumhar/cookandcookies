import React from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect } from 'react';
import { useState } from 'react';

const Category = (props) => {
  let {categoryList,getProductList} = props;
 
    return ( 
        <>
          {
  /*================Welcome Area =================*/
}

<section className="welcome_bakery_area">
  <div className="container">
    <div className="welcome_bakery_inner p_100">
      <div className="row">
        <div className="col-lg-6">
          <div className="main_title">
            <h2>Welcome to our Bakery</h2>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur uis autem vel eum.
            </p>
          </div>
          <div className="welcome_left_text">
            <p>
              Nor again is there anyone who loves or pursues or desires to
              obtain pain of itself, because it is pain, but because
              occasionally circumstances occur in which toil and pain can
              procure him some great pleasure. To take a trivial example, which
              of us ever undertakes laborious physical exercise.
            </p>
            <Link className="pink_btn" to="/aboutus">
              Know more about us
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="welcome_img">
            <img
              className="img-fluid"
              src="./images/cake-feature/welcome-right.jpg"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <div className="cake_feature_inner">
      <div className="main_title">
        <h2>Our Category</h2>
        <h5> Seldolor sit amet consect etur</h5>
      </div>
      <OwlCarousel
    className="owl-theme"
    loop={true}
    margin={25}
    nav={false}
    dots={false}
    dotsEach={false}
    dotData={false}
    items={4}
    autoplay={true}
    autoplayTimeout={3000}
    // autoplayHoverPause={true}
>
{categoryList.map((data,index) => (
  <div key={index} onClick={() => getProductList(data._id,data.category_name)} className="item">
  <div className="cake_feature_item">
    <div className="cake_img">
      <img src={data.image} alt={data.category_name} className='productlist'/>
    </div>
    <div className="cake_text">
      <h3 className="mb-0">{data.category_name}</h3>
      
    </div>
  </div>
</div>

))}      
  
</OwlCarousel>
      
   
    </div>
  </div>
</section>
{
  /*================End Welcome Area =================*/
}
  
        </>
     );
}
 
export default Category;