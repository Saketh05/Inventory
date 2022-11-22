import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Button, TextField, Typography } from "@mui/material";
import Service from "../../apiService/Service";
import { styled } from "@mui/system";

export interface SelectCardProps {
  productId: number;
  productName: string;
  priceValue: number;
  quantityValue: number;
  handleCancel: (Id: number) => void;
}

const StyledCard = styled(Card)`
  display: flex;
  column-gap: 40px;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 50%;
  margin-top: 1%;
  padding: 0 1%;
`;

const SelectCard = ({
  priceValue,
  quantityValue,
  handleCancel,
  productId,
  productName,
}: SelectCardProps) => {
  const [quantity, setQuantity] = useState(quantityValue);
  const [price, setPrice] = useState(priceValue);

  const handleSave = async (
    Id: number,
    newPrice: number,
    newQuatity: number
  ) => {
    // newPrice = newPrice < 0 ? 0 : newPrice;
    // newQuatity = newQuatity < 0 ? 0 : newPrice;
    await Service.patchProduct(Id, newPrice, newQuatity);
  };
  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && setQuantity(Number(event.target.value));
  };
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value && setPrice(Number(event.target.value));
  };

  return (
    <StyledCard variant="outlined">
      <Typography component="div" sx={{ width: "10%" }}>
        {productName}
      </Typography>
      <TextField
        inputProps={{ inputMode: "numeric", min: "0" }}
        label="quantity"
        value={quantity}
        onChange={handleQuantity}
        type="number"
      />
      <TextField
        inputProps={{ inputMode: "numeric", min: "0" }}
        label="price"
        value={price}
        onChange={handlePrice}
        type="number"
      />
      <Button
        variant="contained"
        onClick={() => handleSave(productId, price, quantity)}
      >
        Save
      </Button>
      <Button variant="contained" onClick={() => handleCancel(productId)}>
        Cancel
      </Button>
    </StyledCard>
  );
};

export default SelectCard;
