import React, { useEffect, useState } from 'react'
import AddCateGoryItemDetail from './AddCateGoryItemDetail';
import AddCategoryItems from './AddCategoryItems';
import { Button } from '@mui/material';

function AddCategories(props) {

    const [isColorChosen, setIsColorChosen] = useState(false);
    const [colors, setColors] = useState([]);
    const [isSizeChosen, setIsSizeChosen] = useState(false);
    const [sizes, setSizes] = useState([]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      setCategories(() => {
        let categoriesArr = [];
        colors.forEach((color) => {
          sizes.forEach((size) => {
            categoriesArr.push({
              color: color.value,
              size: size.value,
              image: "",
              price: 0,
              quantity: 0,
              categoryId: "",
            });
          });
        });
        return categoriesArr;
      });
    }, [colors, sizes, setCategories]);

    const colorChangeHandler = (event) => {
      setIsColorChosen(!isColorChosen);
    };

    const sizeChangeHandler = (event) => {
      setIsSizeChosen(!isSizeChosen);
    };

    const moveToNextHandler = () => {
        props.onMoveToNext(categories)
    };

    const changeRecordHandler = (event, rowData) => {
      const { id, value } = event.target;
      setCategories((prevState) => {
        const categories = [...prevState];
        const index = categories.findIndex(
          (item) => item.color === rowData.color && item.size === rowData.size
        );
        categories[index][id] = value;
        return categories;
      });
    };

  return (
    <div>
      <div>
        <label>Chọn phân loại hàng: </label>
        <input
          type="checkbox"
          id="color"
          name="color"
          value="Color"
          onChange={colorChangeHandler}
        />
        <label htmlFor="color">Màu sắc</label>
        <input
          type="checkbox"
          id="size"
          name="size"
          value="Size"
          onChange={sizeChangeHandler}
        />
        <label htmlFor="size">Kích thước</label>
      </div>
      {isColorChosen && (
        <AddCategoryItems label="Màu sắc" items={colors} setItems={setColors} />
      )}
      {isSizeChosen && (
        <AddCategoryItems
          label="Kích thước"
          items={sizes}
          setItems={setSizes}
        />
      )}
      <AddCateGoryItemDetail
        categories={categories}
        onChangeRecord={changeRecordHandler}
      />
      <Button variant="primary" onClick={moveToNextHandler}>
        Tiếp theo
      </Button>
    </div>
  );
}

export default AddCategories