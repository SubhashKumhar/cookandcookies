import React,{Suspense, useState, useEffect} from 'react';
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Home from '../screen/Home';
import Product from '../screen/Product';
import ProductDetail from '../screen/ProductDetail';
import Cart from '../screen/Cart';
import Checkout from '../screen/Checkout';
import AboutUs from '../screen/AboutUs';
import Contact from '../screen/Contact';
import CRUDProduct from '../screen/CRUDProduct';
import CRUDBanner from '../screen/CRUDBanner';
import CRUDCategory from '../screen/CRUDCategory';
import OrderList from '../screen/CRUDOrder';
const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
);
const DefaultContainer = (props) => {
    const [path,setPath] = useState('home')
    const changePath = (path="home") => {
        setPath(path)
    }
    useEffect(() => {
        let currentPath = window.location.hash
        let tempPath = 'home'
        if(currentPath.includes('product')){
            tempPath = 'product'
        }else if(currentPath.includes('contact')){
            tempPath = 'contact'
        }else if(currentPath.includes('aboutus')){
            tempPath = 'aboutus'
        }
        setPath(tempPath)
    },[])
    return (
       
        <Router>
        <Suspense fallback={loading()}>
                <Header path={path} changePath={(path) => changePath(path)} />
               
                <Switch>
                    <Route name="Home" exact path='/' component={Home} {...props}/>
                    <Route name="Product List" exact path='/product' component={Product} {...props} />
                    <Route name="Product Detail" exact={false} path='/product-detail/:id' component={ProductDetail} {...props} />
                    <Route name="Cart" exact path='/cart' component={Cart} {...props} />
                    <Route name="Chechout" exact path='/checkout' component={Checkout} {...props} />
                    <Route name="About Us" exact path='/aboutus' component={AboutUs} {...props} />
                    <Route name="Contact" exact path='/contact' component={Contact} {...props} />
                    <Route name="CRUD Product" exact path='/satish-nirmal-987-product-crud' component={CRUDProduct} {...props} />
                    <Route name="CRUD Banner" exact path='/satish-nirmal-987-banner-crud' component={CRUDBanner} {...props} />
                    <Route name="CRUD Category" exact path='/satish-nirmal-987-category-crud' component={CRUDCategory} {...props} />
                    <Route name="CRUD Category" exact path='/satish-nirmal-987-order-crud' component={OrderList} {...props} />
                    
                </Switch>
               
                <Footer path={path} changePath={(path) => changePath(path)}/>
            
                </Suspense>
        </Router>
    );
}

export default DefaultContainer;