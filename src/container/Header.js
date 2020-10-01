import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { staticData } from '../utils/Common';
import { get } from 'lodash';

const Header = (props) => {
   let {path,changePath} = props;
   
   
    return (
        <>
            {
                /*================Main Header Area =================*/
            }
            <header className="main_header_area">
                <div className="top_header_area row m0">
                    <div className="container">
                        <div className="float-left">
                            <a href="#">
                                <i className="fa fa-phone" aria-hidden="true" />{staticData.mobile_no}
        </a>
                            <a href="#">
                                <i className="fa fa-envelope-o" aria-hidden="true" />{staticData.email}
        </a>
                        </div>
                        <div className="float-right">
                            <ul className="h_social list_style">
                                <li>
                                    <a href={staticData.fb_link} target="_blank">
                                        <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href={staticData.insta_link} target="_blank">
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="#" target="_blank">
                                        <i className="fa fa-google-plus" />
                                    </a>
                                </li> */}
                                {/* <li>
                                    <a href="#" target="_blank">
                                        <i className="fa fa-linkedin" />
                                    </a>
                                </li> */}
                            </ul>
                            <ul className="h_search list_style">
                                <li className="shop_cart">
                                    <Link to="/cart">
                                        <i className="lnr lnr-cart" />
                            {/* <span className="count">{get(JSON.parse(localStorage.getItem('products')),'length',0)}</span> */}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="main_menu_area">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link className="navbar-brand" to="/">
                                <img src="images/logoa.png" alt width={100} />
                                <img src="images/logoa.png" alt width={60} />
                                {/* <img src="img/logo-2.png" alt=""> */}
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="my_toggle_menu">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className={`${path.includes('home') ? 'active' : ''}`}>
                                        <Link to="/" onClick={() => changePath('home')}>Home</Link>
                                    </li>
                                    <li className={`${path.includes('product') ? 'active' : ''}`}>
                                        <Link to="/product" onClick={() => changePath('product')}>Products</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav justify-content-end">
                                    <li className={`${path.includes('aboutus') ? 'active' : ''}`}>
                                        <Link to="/aboutus" onClick={() => changePath('aboutus')}>About Us</Link>
                                    </li>
                                    {/* <li className={`${path.includes('contact') ? 'active' : ''}`}>
                                        <Link to="/contact" onClick={() => changePath('contact')}>Contact Us</Link>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>;
            {
                /*================End Main Header Area =================*/
            }

        </>
    );
}

export default Header;