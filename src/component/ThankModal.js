import React from 'react';
import { Modal } from 'reactstrap';
import Button from '@material-ui/core/Button' ;

const ThankModal = ({ openModal, handleContinue,order_id }) => {
    return (
        <Modal isOpen={openModal}>
            <div className="main_title text-center p-4 f_about_widget">
                <h4 className="thanks">Thanks for shopping with us</h4>
    <div>Order id: {order_id}</div>
                <ul className="nav justify-content-center thanks_nav">
                   <span style={{alignSelf:'center'}}>Follow us: &nbsp;</span>
                   <li>
                        <a href="https://www.facebook.com/skr1195" target="_blank" style={{backgroundColor:'blue'}}>
                            <i className="fa fa-facebook"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/skr1195" target="_blank"  style={{backgroundColor:'blue'}}>
                            <i className="fa fa-instagram" />
                        </a>
                    </li>
                </ul>
                <Button className='thankyoubtn' onClick={handleContinue} variant="contained" color="primary">
  Continue Shopping
</Button>
            </div>
        </Modal>
    );
}

export default ThankModal;