import React from 'react';
import { Modal } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { staticData } from '../utils/Common';

const ThankModal = ({ openModal, handleContinue, order_id }) => {
    return (
        <Modal isOpen={openModal}>
            <div className="main_title text-center p-4 f_about_widget">
                <h4 className="thanks">Thanks for shopping with us</h4>
                <p >Invoice will send on your given mail id please check and call owner to confirm your order</p>
                <div>Order id: {`CC00-${order_id}`}</div>
                <ul className="nav justify-content-center thanks_nav">
                    <span style={{ alignSelf: 'center' }}>Follow us: &nbsp;</span>
                    <li>
                        <a href={staticData.fb_link} target="_blank" style={{ backgroundColor: 'blue' }}>
                            <i className="fa fa-facebook" />
                        </a>
                    </li>
                    <li>
                        <a href={staticData.insta_link} target="_blank" style={{ backgroundColor: 'blue' }}>
                            <i className="fa fa-instagram" />
                        </a>
                    </li>
                </ul>
                <Button className='thankyoubtn' onClick={handleContinue} variant="contained" color="primary">
                    Continue Shopping
</Button>
<div style={{marginTop:10}}>
    <strong><i style={{fontSize:'12px'}}>{staticData.delivery_note}</i></strong></div>
            </div>
        </Modal>
    );
}

export default ThankModal;