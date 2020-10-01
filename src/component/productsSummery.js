import React from 'react';
import { Modal, ModalHeader,ModalFooter,ModalBody } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button' ;

const ProductsSummery = ({ openModal, handleClose,products=[] }) => {
    return (
        <Modal isOpen={openModal}>
            <ModalHeader>Products</ModalHeader>
            <ModalBody>
            <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((productRow) => (
                    <TableRow key={productRow.product_name}>
                      <TableCell component="th" scope="row">
                        {productRow.product_name}
                      </TableCell>
                      <TableCell>{productRow.category_name}</TableCell>
                      <TableCell align="right">{productRow.initial_price}</TableCell>
                      <TableCell align="right">{productRow.quantity}</TableCell>
                      <TableCell align="right">{productRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleClose}>Close</Button>
            </ModalFooter>
            </Modal>
    );
}

export default ProductsSummery;