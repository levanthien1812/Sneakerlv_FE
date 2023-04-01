import { TextField } from "@mui/material";
import React, { useState } from "react";

const CategoryItemDetail = ({ item }) => {
  const [image, setImage] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [categoryId, setCategoryId] = useState()
  
  return (
    <tr>
      <td>
        <p>{item.color.value}</p>
        <input type="file" />
      </td>
      <td>{item.size.value}</td>
      <td>
        <TextField type="number"/>
      </td>
      <td>
        <TextField type="number"/>
      </td>
      <td>
        <TextField type="text"/>
      </td>
    </tr>
  );
}

function AddCateGoryItemDetail({ colors, sizes }) {
  let populate = [];
  colors.forEach((color) => {
    sizes.forEach((size) => {
      populate.push({ color, size });
    });
  });
  return (
    <table>
      <thead>
        <tr>
          {colors && <th>Màu sắc</th>}
          {sizes && <th>Kích thước</th>}
          <th>Gía tiền</th>
          <th>Kho hàng</th>
          <th>Mã phân loại</th>
        </tr>
      </thead>
      <tbody>
        {populate.map((p) => 
          <CategoryItemDetail item={p}/>
        )}
      </tbody>
    </table>
  );
}

export default AddCateGoryItemDetail;
