import React, { useState } from "react";
import AddSneaker from "../components/AddSneaker";
import AddCategories from "../components/AddCategories";

function SneakerPage() {
  // manage fields states
  const [newSneaker, setNewSneaker] = useState({});
  const [newSneakerCategories, setNewSneakerCategories] = useState([]);

  const saveSneakerHandler = (snk) => {
    setNewSneaker(snk);
  };

  console.log(newSneaker);
  console.log(newSneakerCategories);

  return (
    <>
      <AddSneaker onMoveToNext={saveSneakerHandler} />
      <AddCategories
        setNewSneakerCategories={setNewSneakerCategories}
      />
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
