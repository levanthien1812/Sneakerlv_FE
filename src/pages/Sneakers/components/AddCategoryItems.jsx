import { Chip, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";

const ChipList = (props) => {
  return props.items.map((item) => {
    const deleteBtn = () => {
      props.onDeleteInput(item.id);
    };
    return (
      <Chip
        key={item.id}
        label={item.value}
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

function AddCategoryItems({ label, items, setItems }) {
  const [isAddingItem, setIsAddingItem] = useState(false);

  const saveInputHandler = (value) => {
    const item = {
      id: Math.round(Math.random() * 1000),
      value,
    };

    setItems((prevItems) => {
      if (items.length === 0) {
        return [item];
      }
      return [...prevItems, item];
    });

    setIsAddingItem(false);
  };

  const deleteInputHandler = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addInputHandler = () => {
    setIsAddingItem(true);
  };

  return (
    <>
      <p>Thêm loại {label}</p>
      <div>
        {items.length === 0 && <NewInput onSaveInput={saveInputHandler} />}
        {items.length !== 0 && (
          <ChipList items={items} onDeleteInput={deleteInputHandler} />
        )}
        {!isAddingItem && items.length !== 0 && (
          <IconButton variant="contained" onClick={addInputHandler}>
            <AddIcon />
          </IconButton>
        )}
        {isAddingItem && <NewInput onSaveInput={saveInputHandler} />}
      </div>
    </>
  );
}

export default AddCategoryItems;
