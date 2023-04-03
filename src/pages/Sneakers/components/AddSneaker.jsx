import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import BrandSelect from "./BrandSelect";

function AddSneaker(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [coverImage, setCoverImage] = useState();

  const idChangeHandler = (event) => {
    setId(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const changeImageHandler = (event) => {
    setCoverImage(event.target.files[0]);
  };

  //   const uploadImageHandler = async (event) => {
  //     event.preventDefault();

  //     const formData = new FormData();

  //     formData.append("id", idRef.current.value);
  //     formData.append("name", nameRef.current.value);
  //     formData.append("brand", brandRef.current.value);
  //     formData.append("description", descriptionRef.current.value);
  //     formData.append("coverImage", image);

  //     fetch("http://localhost:3000/api/sneakers", {
  //       method: "post",
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log("Success:", result);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   };

  const moveToNextHandler = () => {
    const newSneaker = {
      id,
      name,
      description,
      brand,
      coverImage,
    };
    props.onMoveToNext(newSneaker);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="id">Sneaker's id: </label>
          <TextField
            size="small"
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={idChangeHandler}
          ></TextField>
        </div>
        <div>
          <label htmlFor="name">Sneaker name: </label>
          <TextField
            size="small"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={nameChangeHandler}
          ></TextField>
        </div>
        <div>
          <label htmlFor="coverImage">Sneaker cover image: </label>
          <TextField
            size="small"
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={changeImageHandler}
          ></TextField>
        </div>
        <div>
          <BrandSelect brand={brand} setBrand={setBrand} />
        </div>
        <div>
          <label htmlFor="description">Sneaker description: </label>
          <TextField
            size="small"
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={descriptionChangeHandler}
          ></TextField>
        </div>
        <Button variant="outlined" type="button" onClick={moveToNextHandler}>
          Tiếp theo
        </Button>
      </form>
    </div>
  );
}

export default AddSneaker;
