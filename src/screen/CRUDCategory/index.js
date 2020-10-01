import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Button } from '@material-ui/core';
import SweetAlertBox from '../../component/sweetAlert';
import AddUpdateCategory from '../../component/AddUpdateCategory';
import API from '../../utils/APICalling';
import { config } from '../../utils/APIUrl';
import {get, initial} from 'lodash';
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
const CRUDCategory = () => {
    let api = new API()
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryList,setCategoryList] = useState([])
    const [id,setId] = useState(undefined)
    const [openAlert, setOpenAlert] = useState(false)
    const [actionName, setActionName] = useState('Add')
    const [form, setForm] = useState({ _id: "", category_name: '',image:"" })
    let initialForm = { _id: "", category_name: '',image:"" }
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        getCategoryList()
    },[])
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


        let { _id, category_name,image } = data
            await setForm({ _id,category_name,image })
        
        setOpenModal(!openModal)
        setActionName(actionName)

    }       
    const handleSubmit = async(data) => {
        setLoading(true)
        if(actionName==='Add'){
            delete data._id
        }
        if(typeof(data.image)==='object'){
            let imageURL = await api.postUpload('category',data.image)
            data.image = get(imageURL,'url','') 
       }
        let result = await api[actionName==='Add' ? 'post' : 'put'](actionName==='Add' ? config.categoryAdd : config.categoryUpdate,data)
        if(result.status===true){
        setLoading(false)
        toast.success(result.msg)
        toggle('Add',initialForm)
        getCategoryList()
        }else{
        setLoading(false)
        toast.error(result.msg)
        toggle('Add',initialForm)
        }

    }
    const handleDelete = async() => {
        let result = await api.delete(config.categoryDelete,id)
        if(result.status===true){
            setLoading(false)
            toggleAlert(undefined)
            getCategoryList()
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
    console.log(actionName,'actionName');
    return (
        <>
        <Loading loading={loading} />
        <div className={classes.root}>
            <Button onClick={() => toggle('Add',form)} title="Add" className="float-right m-2" variant="contained" color="primary">
                <i className="fa fa-plus" />
            </Button>
            <Paper>

                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell>{row.category_name}</TableCell>
                                    <TableCell><a href={row.image} target="_blank"><img src={row.image}  alt={row.image} className="imagepreview"/></a></TableCell>
                                   <TableCell>
                                        <Button onClick={() => toggle('Update',row)} title="update" className="mr-2" variant="outlined" color="primary">
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        <Button onClick={() => toggleAlert(row._id)} title="delete" variant="outlined" color="secondary">
                                            <i className="fa fa-trash" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                        
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={categoryList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <AddUpdateCategory openModal={openModal} initialForm={initialForm}
            form={form} toggle={(actionName, data) => toggle(actionName, data)} actionName={actionName} handleSubmit={(data) => handleSubmit(data)}/>
            <SweetAlertBox open={openAlert} onConfirm={handleDelete} onCancel={toggleAlert} />

        </div>
</>
    );
}

export default CRUDCategory;