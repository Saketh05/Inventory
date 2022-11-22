import { AppBar, Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Service from "../../apiService/Service";
import SelectCard from "../molecule/SelectCard";
import { ProductDetailsType } from "./Inventory";
import { styled } from "@mui/system";

const StyledBox = styled(Box)`
  & .header {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
    height: 5%;
    align-items: center;
    padding-left: 2%;
  }

  & .dropDown {
    margin-top: 7%;
    margin-left: 2%;
    width: 10%;
  }
  & .productBox {
    margin-left: 2%;
  }
`;

const Update = () => {
  const [dropDownList, setList] = useState<ProductDetailsType[]>([]);
  const [selectedList, setSelectedList] = useState<ProductDetailsType[]>([]);

  const handleCancel = (Id: number) => {
    setSelectedList(selectedList.filter((item) => item.id !== Id));
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await Service.getProducts();
      setList(productsData);
    };
    getProducts();
  }, []);

  const defaultProps = {
    options: dropDownList,
    getOptionLabel: (option: ProductDetailsType) => option.productName,
  };

  return (
    <StyledBox>
      <AppBar className="header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
      </AppBar>
      <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        onChange={(event: any, newValue: ProductDetailsType | null) => {
          if (newValue) {
            const set = new Set(selectedList);
            if (!set.has(newValue))
              setSelectedList([...selectedList, newValue]);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="controlled" variant="standard" />
        )}
        className="dropDown"
      />
      {selectedList && (
        <Box className="productBox">
          {selectedList.map((item, index) => (
            <SelectCard
              productId={item.id}
              key={index}
              productName={item.productName}
              priceValue={item.price}
              quantityValue={item.quantity}
              handleCancel={handleCancel}
            />
          ))}
        </Box>
      )}
    </StyledBox>
  );
};

export default Update;
