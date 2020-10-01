import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Button } from '@material-ui/core';
import AddUpdateProduct from '../../component/AddUpdateProduct';
import SweetAlertBox from '../../component/sweetAlert';
import {get, initial} from 'lodash';
import { config } from '../../utils/APIUrl';
import API from '../../utils/APICalling';
import { toast } from 'react-toastify';
import Loading from '../../component/Loading';
const useStyles = makeStyles({
    root: {
        width: '78%', margin: "200px auto 0px"
    },
    container: {
        maxHeight: 440,
    },
});
const CRUDProduct = () => {
let api = new API();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryList,setCategoryList] = useState([])
    const [productList,setProductList] = useState([])
    const [openAlert, setOpenAlert] = useState(false)
    const [id,setId] = useState('')
    const [actionName, setActionName] = useState('Add')
    const [form, setForm] = useState({ _id: "", product_name: '', product_cat: "",category_name:"", image: "", customize: false, price: 0, })
    let initialForm = { _id: "", product_name: '', product_cat: "", image: "", customize: false, price: 0, }
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        getProductList()
        getCategoryList()
    },[])
    const getProductList = async(product_cat='all') => {
        setLoading(true)
        let result = await api.get(config.productList,true,{product_cat})
        if(get(result,'status')===true){
            setProductList(get(result,'data',[]))
            setLoading(false)
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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const toggle = async (actionName, data) => {
      
let { _id, product_name, product_cat, customize, image, price  } = data
            await setForm({ _id, product_name, product_cat, customize, image, price })

        setOpenModal(!openModal)
        setActionName(actionName)

    }       
    const handleSubmit = async(data) => {
        setLoading(true)
        if(actionName==='Add'){
            delete data._id
        }
        if(typeof(data.image)==='object'){
            let imageURL = await api.postUpload('products',data.image)
            data.image = get(imageURL,'url','') 
       }
        let result = await api[actionName==='Add' ? 'post' : 'put'](actionName==='Add' ?config.productAdd : config.productUpdate,data)
        console.log(result.status,'result');
        if(result.status===true){
        setLoading(false)
        toast.success(result.msg)
        toggle('Add',initialForm)
        getProductList()
        }else{
        toggle('Add',initialForm)
        setLoading(false)
        toast.error(result.msg)
        }
    }
   
    const handleDelete = async() => {
        
        let result = await api.delete(config.productDelete,id)
        
        if(result.status===true){
            setLoading(false)
            setOpenAlert(false)
            getProductList()
            toast.success(result.msg)
        }else{
            setOpenAlert(false)
            setLoading(false)
            toast.error(result.msg)
        }
    }
    const toggleAlert = (id) => {
        setId(id)
        setOpenAlert(!openAlert)
    }
    return (
        <>
        <Loading loading={loading} />
        <div className={classes.root}>
            <Button onClick={() => toggle('Add',initialForm)} title="Add" className="float-right m-2" variant="contained" color="primary">
                <i className="fa fa-plus" />
            </Button>
            <Paper>

                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Customize</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell><a href={row.image} target="_blank"><img src={row.image} alt={row.image} className="imagepreview"/></a></TableCell>
                                    <TableCell>{row.product_name}</TableCell>
                                    <TableCell>{row.category_name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.customize ? "Available" : "Not Available"}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => toggle('Update',row)} title="update" className="mr-2" variant="outlined" color="primary">
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        <Button onClick={() => toggleAlert(row._id)} title="delete" variant="outlined" color="secondary">
                                            <i className="fa fa-trash" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={productList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <AddUpdateProduct openModal={openModal} initialForm={initialForm} categoryList={categoryList}
            form={form} toggle={(actionName, data) => toggle(actionName, data)} actionName={actionName} handleSubmit={(data) => handleSubmit(data)}/>
            <SweetAlertBox open={openAlert} onConfirm={handleDelete} onCancel={toggleAlert} />

        </div>
</>
    );
}

export default CRUDProduct;