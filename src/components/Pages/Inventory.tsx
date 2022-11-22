import {
  AppBar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Service from "../../apiService/Service";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

export interface ProductDetailsType {
  id: number;
  sellerName: string;
  productName: string;
  price: number;
  quantity: number;
}

const StyledBox = styled(Box)`
  & .table {
    width: 60%;
    margin: 0 auto;
  }
  & .MuiTableCell-head {
    font-weight: bold;
  }
  & .heading {
    text-align: center;
  }
  & .header {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
    height: 5%;
    align-items: center;
    padding-left: 2%;
  }
  & .childBox {
    margin-top: 7%;
  }
`;

const Inventory = () => {
  const [products, setProducts] = useState<ProductDetailsType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await Service.getProducts();
      setProducts(productsData);
    };
    getProducts();
  }, []);

  return (
    <StyledBox>
      <AppBar className="header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
      </AppBar>
      <Box className="childBox">
        <Typography variant="h4" component="div" className="heading">
          Inventory
        </Typography>
        <TableContainer component={Paper} className="table">
          <Table>
            <TableHead>
              <TableRow className="tableRow">
                <TableCell>Seller Name</TableCell>
                <TableCell align="right">Product Id</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total Amount&nbsp;(Rs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sellerName}</TableCell>
                  <TableCell align="right">{item.id}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {item.price * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </StyledBox>
  );
};

export default Inventory;
