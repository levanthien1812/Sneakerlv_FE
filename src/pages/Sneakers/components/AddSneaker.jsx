import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import BrandSelect from "./BrandSelect";

function AddSneaker(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState([]);
  const [isReset, setIsReset] = useState(false);

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

  const changeImagesHandler = (event) => {
    const images = Array.from(event.target.files);
    setImages(images);
  };

  const moveToNextHandler = () => {
    const newSneaker = {
      id,
      name,
      description,
      brand,
      coverImage,
      images,
    };
    props.onMoveToNext(newSneaker);
  };

  // if (props.isReset) {
  //   setBrand("");
  //   setCoverImage("");
  //   setDescription("");
  //   setId("");
  //   setImages([]);
  //   setName("");
  // }

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
          <label htmlFor="images">Sneaker cover image: </label>
          <TextField
            size="small"
            type="file"
            id="images"
            name="images"
            inputProps={{
              multiple: true,
            }}
            onChange={changeImagesHandler}
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
