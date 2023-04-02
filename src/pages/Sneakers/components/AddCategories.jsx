import React, { useEffect, useState } from "react";
import AddCateGoryItemDetail from "./AddCateGoryItemDetail";
import AddCategoryItems from "./AddCategoryItems";

function AddCategories(props) {
  const [isColorChosen, setIsColorChosen] = useState(false);
  const [colors, setColors] = useState([]);
  const [isSizeChosen, setIsSizeChosen] = useState(false);
  const [sizes, setSizes] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(() => {
      let categoriesArr = [];
      const cate = {
        image: "",
        price: 0,
        quantity: 0,
        categoryId: "",
      };
      if (colors.length > 0) {
        colors.forEach((color) => {
          if (sizes.length > 0)
            sizes.forEach((size) => {
              categoriesArr.push({
                ...cate,
                color: color.value,
                size: size.value,
              });
            });
          else
            categoriesArr.push({
              ...cate,
              color: color.value,
              size: undefined,
            });
        });
      } else if (sizes.length > 0) {
        sizes.forEach((size) => {
          categoriesArr.push({
            ...cate,
            color: undefined,
            size: size.value,
          });
        });
      }

      return categoriesArr;
    });
  }, [colors, sizes, setCategories]);

  const colorChangeHandler = () => {
    setIsColorChosen(!isColorChosen);
  };

  const sizeChangeHandler = () => {
    setIsSizeChosen(!isSizeChosen);
  };

  const changeRecordHandler = (event, rowData) => {
    const { id, value, files } = event.target;
    const cates = [...categories];
    const index = cates.findIndex(
      (item) => item.color === rowData.color && item.size === rowData.size
    );
    cates[index][id] = value;
    if (files) {
      cates[index]["image"] = files[0];
    }
    setCategories(cates);
    props.setNewSneakerCategories(cates);
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
        sizesLength={sizes.length}
        colorsLength={colors.length}
        categories={categories}
        onChangeRecord={changeRecordHandler}
      />
    </div>
  );
}

export default AddCategories;
