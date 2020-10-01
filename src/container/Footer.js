import React from 'react';
import { Link } from 'react-router-dom'
import { staticData } from '../utils/Common';

const Footer = (props) => {
    let {path,changePath} = props
    return (
        <>
            <div>
                {/*================Footer Area =================*/}
                <footer className="footer_area">
                    <div className="footer_widgets">
                        <div className="container">
                            <div className="row footer_wd_inner">
                                <div className="col-lg-4 col-6">
                                    <aside className="f_widget f_about_widget">
                                    <img src="images/logoa.png" alt width={100} />
                                        <p>
                                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                                            bland itiis praesentium voluptatum deleniti atque corrupti.
              </p>
                                        <ul className="nav">
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
                            
                                    </aside>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <aside className="f_widget f_link_widget">
                                        <div className="f_title">
                                            <h3>Quick links</h3>
                                        </div>
                                        <ul className="list_style">
                                            <li >
                                                <Link to="/product" onClick={() => changePath('product')}>Products</Link>
                                            </li>
                                            <li>
                                                <Link to="/cart"  onClick={() => changePath('home')}>Your Cart</Link>
                                            </li>
                                            <li>
                                                <Link to="/aboutus"  onClick={() => changePath('aboutus')}>About US</Link>
                                            </li>
                                            {/* <li>
                                                <Link to="/contact" onClick={() => changePath('contact')}>Contact Us</Link>
                                            </li> */}
                                        </ul>
                                    </aside>
                                </div>
                                {/* <div class="col-lg-3 col-6">
  					<aside class="f_widget f_link_widget">
  						<div class="f_title">
  							<h3>Work Times</h3>
  						</div>
  						<ul class="list_style">
  							<li><a href="#">Mon. :  Fri.: 8 am - 8 pm</a></li>
  							<li><a href="#">Sat. : 9am - 4pm</a></li>
  							<li><a href="#">Sun. : Closed</a></li>
  						</ul>
  					</aside>
  				</div> */}
                                <div className="col-lg-4 col-6">
                                    <aside className="f_widget f_contact_widget">
                                        <div className="f_title">
                                            <h3>Contact Info</h3>
                                        </div>
                                        <h4>{staticData.mobile_no}</h4>
                                        <p>
                                            {staticData.address}
              </p>
                                        <h5>{staticData.email}</h5>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/*================End Footer Area =================*/}
                {/*================Search Box Area =================*/}
                <div className="search_area zoom-anim-dialog mfp-hide" id="test-search">
                    <div className="search_box_inner">
                        <h3>Search</h3>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for..."
                            />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <i className="icon icon-Search" />
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                {/*================End Search Box Area =================*/}
            </div>
        </>
    );
}

export default Footer;