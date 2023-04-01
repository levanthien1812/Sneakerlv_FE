import { Button } from "@mui/material";
import React from "react";
import { useRef, useState } from "react";

function AddSneaker(props) {
  const idRef = useRef("");
  const nameRef = useRef("");
  const brandRef = useRef("");
  const descriptionRef = useRef("");
  const [image, setImage] = useState();

  const changeImageHandler = (event) => {
    setImage(event.target.files[0]);
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
      id: idRef.current.value,
      name: nameRef.current.value,
      brand: brandRef.current.value,
      description: descriptionRef.current.value,
      coverImage: image,
    };
    props.onMoveToNext(newSneaker);
  };

  return (
    <div>
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
        <Button variant="primary" type="button" onClick={moveToNextHandler}>
          Tiếp theo
        </Button>
      </form>
    </div>
  );
}

export default AddSneaker;
