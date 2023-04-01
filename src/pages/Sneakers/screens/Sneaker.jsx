import React, { useEffect, useState } from "react";
import AddCategoryItems from "../components/AddCategoryItems";
import AddCateGoryItemDetail from "../components/AddCateGoryItemDetail";
import { Button } from "@mui/material";
import AddSneaker from "../components/AddSneaker";

function SneakerPage() {
  // manage fields states
  const [newSneaker, setNewSneaker] = useState({})

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

  const moveToNextHandler = (categories) => {};

  const changeRecordHandler = (event, rowData) => {
    const { id, value } = event.target;
    setCategories((prevState) => {
      const categories = [...prevState]
      const index = categories.findIndex(
        (item) => (item.color === rowData.color && item.size === rowData.size)
      );
      categories[index][id] = value
      return categories
    });
  };

  const saveSneakerHandler = (snk) => {
    setNewSneaker(snk)
  }

  console.log(newSneaker);

  return (
    <>
      <AddSneaker onMoveToNext={ saveSneakerHandler } />
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
          <AddCategoryItems
            label="Màu sắc"
            items={colors}
            setItems={setColors}
          />
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
    </>
  );
}

// export async function action({ request, params }) {
//   const data = await request.formData();
//   const sneakerData = new FormData();

//   sneakerData.append("id", data.get("id"));
//   sneakerData.append("name", data.get("name"));
//   sneakerData.append("description", data.get("description"));
//   sneakerData.append("brand", data.get("brand"));
//   sneakerData.append("coverImage", data.get("coverImage"));

//   const response = await fetch("http://localhost:3000/api/sneakers", {
//     method: request.method,
//     body: sneakerData,
//   });

//   if (!response.ok) {
//     console.log("Fail to create sneaker");
//     throw json(
//       {
//         message: "Fail to create sneaker",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
//   return redirect("/sneaker");
// }

export default SneakerPage;
