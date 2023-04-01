import { IconButton, Chip, TextField } from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const ChipList = (props) => {
  return props.items.map((item) => {
    const deleteBtn = () => {
      props.onDeleteInput(item.id);
    };
    return (
      <Chip
        key={item.id}
        label={item.color}
        variant="outlined"
        onDelete={deleteBtn}
      />
    );
  });
};

const NewInput = (props) => {
  const [newValue, setNewValue] = useState("");
  const saveInputHandler = () => {
    props.onSaveInput(newValue);
  };
  const changeValueHandler = (event) => {
    setNewValue(event.target.value);
  };
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        size="small"
        onChange={changeValueHandler}
      />
      <IconButton onClick={saveInputHandler}>
        <CheckIcon />
      </IconButton>
    </>
  );
};

function SneakerPage() {
  // manage fields states
  const idRef = useRef();
  const nameRef = useRef();
  const brandRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState();

  const [isColorChosen, setIsColorChosen] = useState(false);
  const [colors, setColors] = useState([]);
  const [isAddingColor, setIsAddingColor] = useState(false);
  const [isSizeChosen, setIsSizeChosen] = useState(false);
  const [sizes, setSizes] = useState([]);

  const changeImageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImageHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", idRef.current.value);
    formData.append("name", nameRef.current.value);
    formData.append("brand", brandRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("coverImage", image);

    fetch("http://localhost:3000/api/sneakers", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const colorChangeHandler = (event) => {
    setIsColorChosen(!isColorChosen);
  };

  const addInputHandler = () => {
    setIsAddingColor(true);
  };

  const saveInputHandler = (value) => {
    const color = {
      id: Math.round(Math.random() * 1000),
      color: value,
    };

    setColors(prevColors => {
      if (colors.length === 0) {
        return [color]
      }
      return [...prevColors, color]
    });

    setIsAddingColor(false);
  };

  const deleteInputHandler = (id) => {
    setColors((prevColors) => prevColors.filter((color) => color.id !== id));
  };

  
  const sizeChangeHandler = (event) => {
    setIsSizeChosen(!isSizeChosen);
  };


  return (
    <>
      <form>
        <div>
          <label htmlFor="id">Sneaker's id: </label>
          <input type="text" id="id" name="id" ref={idRef}></input>
        </div>
        <div>
          <label htmlFor="name">Sneaker name: </label>
          <input type="text" id="name" name="name" ref={nameRef}></input>
        </div>
        <div>
          <label htmlFor="coverImage">Sneaker cover image: </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={changeImageHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="brand">Sneaker brand: </label>
          <input type="text" id="brand" name="brand" ref={brandRef}></input>
        </div>
        <div>
          <label htmlFor="description">Sneaker description: </label>
          <input
            type="text"
            id="description"
            name="description"
            ref={descriptionRef}
          ></input>
        </div>
        <button type="submit" onClick={uploadImageHandler}>
          Submit
        </button>
      </form>
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
          <label htmlFor="size">Kích cỡ</label>
        </div>
        {isColorChosen && (
          <div>
            <p>Thêm loại màu sắc</p>
            <div>
              {colors.length === 0 && (
                <NewInput onSaveInput={saveInputHandler} />
              )}
              {colors.length !== 0 && (
                <ChipList items={colors} onDeleteInput={deleteInputHandler} />
              )}
              {!isAddingColor && colors.length !== 0 && (
                <IconButton variant="contained" onClick={addInputHandler}>
                  <AddIcon />
                </IconButton>
              )}
              {isAddingColor && <NewInput onSaveInput={saveInputHandler} />}
            </div>
          </div>
        )}
        {isSizeChosen && (
          <div>
            <p>Thêm loại kích thước</p>
            <div>
              <div>
                <input></input>
              </div>
              <button>+</button>
            </div>
          </div>
        )}
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
