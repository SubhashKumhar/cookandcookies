import React, { useState,useEffect } from 'react';
import Banner from "./Banner";
import Category from './Category';
import ProductSection from './ProductSection';
import API from '../../utils/APICalling';
import { config } from '../../utils/APIUrl';
import { get } from 'lodash';
import Loading from '../../component/Loading';

const Home = (props) => {
    let api = new API()
    const [bannerList,setBannerList] = useState([])
    const [categoryList,setCategoryList] = useState([])
    const [productList,setProductList] = useState([])
    const [category_name,set_category_name] = useState('Products')
    const [loading,setLoading] = useState(false)
    console.log(props,'props');
    useEffect(()=> {
        getbannerList()
        getCategoryList()
        getProductList()
    },[])
    const getProductList = async(product_cat='all',category_name="Products") => {
        setLoading(true)
        let result = await api.get(config.productList,true,{product_cat})
        if(get(result,'status')===true){
            setProductList(get(result,'data',[]))
            set_category_name(category_name)
            setLoading(false)
        }else{
            setLoading(false)
          }
    }
    const getbannerList = async() => {
        setLoading(true)
        let result = await api.get(config.bannerList,false)
        if(get(result,'status')===true){
            setLoading(false)
            setBannerList(get(result,'data',[]))
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
    return ( 
        <>
            <Loading loading={loading}/>
            <Banner bannerList={bannerList}/>
            <Category categoryList={categoryList} getProductList={(product_cat,category_name) => getProductList(product_cat,category_name)}/>
            <ProductSection productList={productList} category_name={category_name}/>
        </>
     );
}
 
export default Home;