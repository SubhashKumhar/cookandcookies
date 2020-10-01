import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Button } from '@material-ui/core';
import {get} from 'lodash';
import SweetAlertBox from '../../component/sweetAlert';
import AddUpdateBanner from '../../component/AddUpdateBanner';
import API from '../../utils/APICalling';
import { config } from '../../utils/APIUrl';
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
const CRUDBanner = () => {
let api = new API();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false)
    const [bannerList,setBannerList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [id,setId] =  useState(undefined)
    const [actionName, setActionName] = useState('Add')
    const [form, setForm] = useState({ _id: "", banner_content: '',  image: "", })
    let initialForm = { _id: "", banner_content: '',  image: "", }
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        getbannerList()
    },[])

    const getbannerList = async() => {
        setLoading(true)
        let result = await api.get(config.bannerList,false)
        if(get(result,'status')===true){
            setLoading(false)
            setBannerList(get(result,'data',[]))
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
      
            
let { _id, banner_content,  image  } = data
            await setForm({ _id, banner_content,  image, })
        
        setOpenModal(!openModal)
        setActionName(actionName)

    }       
    const handleSubmit = async(data) => {
        setLoading(true)
        if(actionName==='Add'){
            delete data._id
        }
        console.log(data,'data',typeof(data.image));
        if(typeof(data.image)==='object'){
             let imageURL = await api.postUpload('banner',data.image)
           
             data.image = get(imageURL,'url','') 
        }
        let result = await api[actionName==='Add' ? 'post' : 'put'](actionName==='Add' ? config.bannerAdd : config.bannerUpdate,data)
        console.log(result.status,'result');
        if(result.status===true){
        setLoading(false)
        toggle(actionName, initialForm)
        toast.success(result.msg)
        getbannerList()
        }else{
        setLoading(false)
        toast.error(result.msg)
        }
    }
    const handleDelete = async() => {
        let result = await api.delete(config.bannerDelete,id)
        if(result.status===true){
            setLoading(false)
            toggleAlert(undefined)
            getbannerList()
            toast.success(result.msg)
        }else{
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
                            <TableCell>Banner Content</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bannerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell><a href={row.image} target="_blank"><img src={row.image}  alt={row.image} className="imagepreview"/></a></TableCell>
                                    <TableCell>{row.banner_content}</TableCell>
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
                    count={bannerList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <AddUpdateBanner openModal={openModal} initialForm={initialForm}
            form={form} toggle={(actionName, data) => toggle(actionName, data)} actionName={actionName} handleSubmit={(data) => handleSubmit(data)} />
            <SweetAlertBox open={openAlert} onConfirm={handleDelete} onCancel={toggleAlert} />

        </div>

       </>
    );
}

export default CRUDBanner;