import React from 'react';
import { staticData } from '../../utils/Common';

const Contact = () => {
    return ( 
        <>
            <div>
  {/*================End Main Header Area =================*/}
  <section className="banner_area">
    <div className="container">
      <div className="banner_text">
        <h3>Contact Us</h3>
      </div>
    </div>
  </section>
  {/*================End Main Header Area =================*/}
  {/*================Contact Form Area =================*/}
  <section className="contact_form_area p_100">
    <div className="container">
      <div className="main_title">
        <h2>Get In Touch</h2>
        <h5>
          Do you have anything in your mind to let us know? Kindly don't delay
          to connect to us by means of our contact form.
        </h5>
      </div>
      <div className="row">
        <div className="col-lg-7">
          <form
            className="row contact_us_form"
            action="http://designarc.biz/demos/cake/theme/cake-html/contact_process.php"
            method="post"
            id="contactForm"
            noValidate="novalidate"
          >
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Your name"
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email address"
              />
            </div>
            <div className="form-group col-md-12">
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                placeholder="Subject"
              />
            </div>
            <div className="form-group col-md-12">
              <textarea
                className="form-control"
                name="message"
                id="message"
                rows={1}
                placeholder="Wrtie message"
                defaultValue={""}
              />
            </div>
            <div className="form-group col-md-12">
              <button
                type="submit"
                value="submit"
                className="btn order_s_btn form-control"
              >
                submit now
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-4 offset-md-1">
          <div className="contact_details">
            <div className="contact_d_item">
              <h3>Address :</h3>
              <p>
                {staticData.address}
              </p>
            </div>
            <div className="contact_d_item">
              <h5>
                Phone : <a href="#">{staticData.mobile_no}</a>
              </h5>
              <h5>
                Email :{" "}
                <a href="#">{staticData.email}</a>
              </h5>
            </div>
            <div className="contact_d_item">
              <h3>Opening Hours :</h3>
              <p>{staticData.business_hour}</p>
              <p>Monday – Sunday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================End Contact Form Area =================*/}
</div>
        </>
     )
}
 
export default Contact;