import { TextField } from "@mui/material";
import React from "react";

const CategoryRow = ({ cate, onChangeRecord }) => {

  const rowData = {
    size: cate.size,
    color: cate.color
  }

  const changeHandler = (event) => {
    onChangeRecord(event, rowData)
  }

  return (
    <tr>
      {cate.color && (
        <td>
          <p>{cate.color}</p>
          <input type="file" id="file" defaultValue={cate.image} onChange={changeHandler} />
        </td>
      )}
      {cate.size && <td>{cate.size}</td>}
      <td>
        <TextField type="number" id="price" defaultValue={cate.price} onChange={changeHandler}/>
      </td>
      <td>
        <TextField type="number" id="quantity" defaultValue={cate.quantity} onChange={changeHandler}/>
      </td>
      <td>
        <TextField type="text" id="categoryId" defaultValue={cate.categoryId} onChange={changeHandler}/>
      </td>
    </tr>
  );
};

function AddCateGoryItemDetail({ categories, onChangeRecord }) {
  const changeRecordHandler = (event, rowData) => {
    onChangeRecord(event, rowData);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Màu sắc</th>
          <th>Kích thước</th>
          <th>Gía tiền</th>
          <th>Kho hàng</th>
          <th>Mã phân loại</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cate) => (
          <CategoryRow
            key={Math.random()}
            cate={cate}
            onChangeRecord={changeRecordHandler}
          />
        ))}
      </tbody>
    </table>
  );
}

export default AddCateGoryItemDetail;
