import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import {get} from 'lodash';
import API from '../utils/APICalling';
import { config } from '../utils/APIUrl';
import Loading from '../component/Loading';
import ProductsSummery from '../component/productsSummery'
const useStyles = makeStyles({
    root: {
        width: '78%', margin: "200px auto 0px"
    },
    container: {
        maxHeight: 440,
    },
    root: {
        '& > *': {
          borderBottom: 'unset',
        },
      },
});
const OrderList = () => {
let api = new API();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false)
    const [orderList,setOrderList] = useState([])
  const [open, setOpen] = React.useState(false);
  const [products,setProducts] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        getOrderList()
    },[])

    const getOrderList = async() => {
        setLoading(true)
        let result = await api.get(config.orderList,false)
        if(get(result,'status')===true){
            setLoading(false)
            setOrderList(get(result,'data',[]))
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

    const getPorductSummery = async(id) => {
        let temp = [...orderList]
        let filterOrder = await temp.filter((f,fIndex) => f._id ==id)
        setProducts(filterOrder[0].products)
        setOpen(true)
    }
    return (
       <>
       <Loading loading={loading} />
        <div className={classes.root}>
            <Paper>

                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                        <TableCell>Sr No.</TableCell>
                     
                           
                            <TableCell>Order Id</TableCell>
                            <TableCell>Product Count</TableCell>
                            <TableCell>User Detail</TableCell>
                            <TableCell>Total Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell>{index + 1}</TableCell>
                                   <TableCell>{row._id}</TableCell>
                            <TableCell><div onClick={() => getPorductSummery(row._id)}>{row.products.length}</div></TableCell>
                            <TableCell>{get(row,'user_detail.customer_name','')}(mob. {get(row,'user_detail.mobile','')})</TableCell>
                            <TableCell>{get(row,'total_amount',0)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={orderList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
                        <ProductsSummery products={products} openModal={open} handleClose={() => setOpen(!open)}/>
       </>
    );
}

export default OrderList;