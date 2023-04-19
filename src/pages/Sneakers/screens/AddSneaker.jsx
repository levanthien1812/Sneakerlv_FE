import React, { useState } from "react";
import AddSneaker from "../components/AddSneaker";
import AddCategories from "../components/AddCategories";
import { Button } from "@mui/material";

function AddSneakerPage() {
  // manage fields states
  const [newSneaker, setNewSneaker] = useState({});
  const [newSneakerCategories, setNewSneakerCategories] = useState([]);
  const [isReset, setIsReset] = useState(false);

  const saveSneakerHandler = (snk) => {
    setNewSneaker(snk);
  };

  console.log(newSneaker);
  console.log(newSneakerCategories);

  const saveHandler = async () => {
    const sneakerFormdata = new FormData();
    sneakerFormdata.append("id", newSneaker.id);
    sneakerFormdata.append("name", newSneaker.name);
    sneakerFormdata.append("brand", newSneaker.brand);
    sneakerFormdata.append("description", newSneaker.description);
    sneakerFormdata.append("coverImage", newSneaker.coverImage);
    newSneaker.images.forEach((image) => {
      sneakerFormdata.append("images", image);
    });

    const sneakerResponse = await fetch("http://localhost:3000/api/sneakers", {
      method: "post",
      body: sneakerFormdata,
    });

    if (!sneakerResponse.ok) {
      throw new Error("Fail!");
    } else {
      console.log("Success!");
    }

    if (newSneakerCategories.length === 0) return;
    await Promise.all(
      newSneakerCategories.map(async (snkCate) => {
        const categoryFormdata = new FormData();

        categoryFormdata.append("image", snkCate.image);
        categoryFormdata.append("color", snkCate.color);
        categoryFormdata.append("quantity", snkCate.quantity);
        categoryFormdata.append("categoryId", snkCate.categoryId);
        categoryFormdata.append("size", snkCate.size);
        categoryFormdata.append("price", snkCate.price);
        categoryFormdata.append("sneaker", newSneaker._id);

        const categoryResponse = await fetch(
          "http://localhost:3000/api/sneakers/categories",
          {
            method: "POST",
            body: categoryFormdata,
          }
        );
        if (!categoryResponse.ok) {
          throw new Error("Fail!");
        } else {
          console.log("Success!");
        }
      })
    );
  };

  return (
    <>
      <AddSneaker onMoveToNext={saveSneakerHandler} />
      <AddCategories setNewSneakerCategories={setNewSneakerCategories} />
      <div>
        <Button variant="contained" onClick={saveHandler}>
          Lưu
        </Button>
        {/* <Button
          sx={{ marginLeft: "10px" }}
          variant="contained"
          color="error"
          onClick={() => setIsReset(true)}
        >
          Reset
        </Button> */}
      </div>
    </>
  );
}

export default AddSneakerPage;
