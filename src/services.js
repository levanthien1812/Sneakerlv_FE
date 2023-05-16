export const getProvinces = async () => {
  const response = await fetch("https://vapi.vnappmob.com/api/province");
  const data = await response.json();
  return data.results;
};

export const getDistricts = async (province_id) => {
  const response = await fetch(
    "https://vapi.vnappmob.com/api/province/district/" + province_id
  );
  const data = await response.json();
  return data.results;
};

export const getWards = async (district_id) => {
  const response = await fetch(
    "https://vapi.vnappmob.com/api/province/ward/" + district_id
  );
  const data = await response.json();
  return data.results;
};

export const fetchAddresses = async () => {
  const response = await fetch(
    "http://localhost:3000/api/users/account/addresses",
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data.data;
};

export const saveCart = async (cartItems) => {
  const response = await fetch("http://localhost:3000/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

export const fetchCart = async () => {
  const response = await fetch("http://localhost:3000/api/carts", {
    credentials: "include",
  });

  const data = await response.json();
  return data.data;
};

export const deleteAddress = async (addressId) => {
  const response = await fetch(
    "http://localhost:3000/api/users/account/addresses/" + addressId,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
};