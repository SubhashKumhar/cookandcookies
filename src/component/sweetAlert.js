import React, { Fragment } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertBox = (props) => {
   const {open,onConfirm,onCancel,title="Are you sure?"} = props
    return ( 
        <Fragment>
            {open===true ? <SweetAlert
        warning
        showCancel
        confirmBtnText="Submit"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
      ></SweetAlert> : null}
        </Fragment>
     );
}
 
export default SweetAlertBox;