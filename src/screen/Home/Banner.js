import React, { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Banner = ({bannerList}) => {
  
return (
<section className="main_slider_area">
<OwlCarousel
    className="owl-theme"
    loop={true}
    margin={0}
    nav={false}
    dots={false}
    dotsEach={false}
    dotData={false}
    items={1}
    autoplay={true}
    autoplayTimeout={1500}
    // autoplayHoverPause={true}
>
    {bannerList.map((data,index) => (
        <div key={index}>
    <img style={{height:'100%',maxHeight:'550px'}} src={data.image} />
</div>
    ))}


  
</OwlCarousel>
 </section>
)
   
}
     
 
export default Banner;