import React, { useState, useEffect } from 'react';
import {Modal,ModalHeader,ModalBody,ModalFooter,Button, Row,Form,FormGroup,Label,Input,Col} from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import InputField from './InputField';
import {get} from 'lodash';

const AddUpdateCategory = (props) => {
  let {actionName,toggle,openModal,initialForm} = props;
    const [form,setForm] = useState(props.form)
    console.log(form,'props');

    useEffect(() => {
      setForm(props.form)
    },[props.form])

   const handleSubmit = () => {
        props.handleSubmit(form)
    }
   const handleChange = (e) => {
        setForm({
            ...form,
                [e.target.name]:e.target.value
            
        })
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
        <ModalHeader toggle={() => toggle(actionName,initialForm)}>{actionName} Category</ModalHeader>
        <AvForm onValidSubmit={handleSubmit}>
      <ModalBody>
            <Row>
                <Col sm={12} md={12}>
                <FormGroup>
        <Label htmlFor="category_name">Category Name</Label>
        <InputField type={'text'} inputName={'category_name'} id="category_name" inputValue={form.category_name} validationLabel={'category'} onChange={handleChange} placeholder={'Enter category name*'}  />
      </FormGroup>
                </Col>
            </Row>  
            <Row>
                <Col sm={12} md={6}>
                <FormGroup>
        <Label htmlFor="categoryimage">Category Image</Label>
        <Input type="file" name="image"  id="categoryimage" onChange={handleImageChange}/>
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
    <Button color="primary" type='submit'>{actionName}</Button>{' '}
          <Button color="secondary" onClick={() => toggle(actionName,initialForm)}>Cancel</Button>
        </ModalFooter>
        </AvForm>
      </Modal>
        </>
     );
}
 
export default AddUpdateCategory;