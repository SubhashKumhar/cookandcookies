import React, { useState, useEffect } from 'react';
import {Modal,ModalHeader,ModalBody,ModalFooter,Button, Row,Form,FormGroup,Label,Input,Col} from 'reactstrap';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import InputField from './InputField';
import {  get } from 'lodash';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import API from '../utils/APICalling';

const AddUpdateProduct = (props) => {
  let {actionName,toggle,openModal,categoryList,initialForm} = props;
    const [form,setForm] = useState(props.form)
    let api = new API()
    console.log(form,'props');

    useEffect(() => {
      setForm(props.form)
    },[props.form])

    const handleChange = (e) => {
      console.log(e.target,'e.target');
      
     
     if(e.target.name==='customize'){
      setForm({
        ...form,
            [e.target.name]:e.target.value==="true" ? true : false,
    })
     }else if(e.target.name==='price'){
      setForm({
        ...form,
            [e.target.name]:parseInt(e.target.value),
    })
     }else{
      setForm({
        ...form,
            [e.target.name]:e.target.value
      })
     }
     
    }
   
    
   const handleSubmit = () => {
    props.handleSubmit(form)
}
const handleImageChange = (e) => {
  if(e.target.files[0] !==undefined){
    setForm({
      ...form,
          image:e.target.files[0]
      
  })
  }
  }
    return ( 
        <>
          <Modal isOpen={openModal} toggle={() => toggle(actionName,initialForm)}>
        <ModalHeader toggle={() => toggle(actionName,initialForm)}>{actionName} Product</ModalHeader>
        <AvForm onValidSubmit={handleSubmit}>
      <ModalBody>
            <Row>
                <Col sm={12} md={6}>
                <FormGroup>
        <Label htmlFor="productname">Product Name *</Label>
        <InputField type={'text'} inputName={'product_name'} id="productname" inputValue={form.product_name} validationLabel={'product name'} onChange={handleChange} placeholder={'Enter product name*'}  />
        
      </FormGroup>
                </Col>
                <Col sm={12} md={6}> 
                <FormGroup>
        <Label htmlFor="product_cat">Category *</Label>
        <AvField type="select" name="product_cat" id="product_cat" value={form.product_cat} onChange={handleChange}  validate={{
            required: {
              value: true,
              errorMessage: `${'category'} is required`,
            },
          }}>
          <option value="">choose category</option>
          {categoryList.map((data,index) => (
            <option key={index} value={data._id}>{data.category_name}</option>
          ))}
        </AvField>
      </FormGroup></Col>
            </Row>  
            <Row>
                <Col sm={12} md={6}>
                <FormGroup>
        <Label htmlFor="price">Price *</Label>
        <InputField type={'number'} inputName={'price'} id="price" inputValue={form.price} validationLabel={'price'} onChange={handleChange} placeholder={'Enter product price*'}  />
        
      </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                <FormGroup>
        <Label htmlFor="customize">Customize</Label>
        <Input type="select" onChange={handleChange} value={form.customize} name="customize" id="customize">
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </Input>
      </FormGroup>
                     </Col>
            </Row>  
            <Row>
                <Col sm={12} md={6}>
                <FormGroup>
        <Label htmlFor="productimage">Product Image</Label>
        <Input type="file" name="image"  id="productimage" onChange={handleImageChange}/>
        
      </FormGroup>
                </Col>
                <Col sm={12} md={6}> 
                <FormGroup>
        <Label >Preview</Label>
<img src={typeof(form.image) === 'object' ? URL.createObjectURL(form.image) : form.image} alt="" style={{height:'160px',width:"200px",border:'1px solid #0000002b'}} />
        </FormGroup>
        
        </Col>
            </Row>  
        </ModalBody>
        <ModalFooter>
    <Button color="primary" type='submit'>{actionName}</Button>
          <Button color="secondary" onClick={() => toggle(actionName,initialForm)}>Cancel</Button>
        </ModalFooter>
        </AvForm>
      </Modal>
        </>
     );
}
 
export default AddUpdateProduct;