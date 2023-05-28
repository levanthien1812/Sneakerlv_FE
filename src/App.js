import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddSneakerPage from "./pages/Sneakers/screens/AddSneaker";
import Layout from "./components/layout";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { useEffect } from "react";
import SneakersPage, {
  sneakersLoader,
} from "./pages/Sneakers/screens/Sneakers";
import SneakerDetail, {
  sneakerLoader,
} from "./pages/Sneakers/screens/SneakerDetail";
import Cart, { cartLoader } from "./pages/Cart/screens/Cart";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Screens/Account";
import AccountRoot from "./pages/Account/Components/AccountRoot";
import PrivateRoute from "./utils/PrivateRoute";
import NotAuth from "./components/UI/NotAuth";
import Addresses from "./pages/Account/Screens/Addresses";
import ChangePassword from "./pages/Account/Screens/ChangePassword";
import Checkout from "./pages/Receipt/screens/Checkout";
import SuccessfullOrder from "./pages/Receipt/components/SuccessfullOrder";
import Orders from "./pages/Account/Screens/Orders";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sneakers",
        children: [
          {
            index: true,
            loader: sneakersLoader,
            element: <SneakersPage />,
          },
          {
            path: "add",
            element: <AddSneakerPage />,
          },
          {
            path: ":slug",
            loader: sneakerLoader,
            element: <SneakerDetail />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AccountRoot />,
            children: [
              {
                path: "account",
                children: [
                  {
                    path: "profile",
                    element: <Account />,
                  },
                  {
                    path: "addresses",
                    element: <Addresses />,
                  },
                  {
                    path: "change-password",
                    element: <ChangePassword />,
                  },
                ],
              },
              {
                path: "my-orders",
                element: <Orders />,
              },
            ],
          },

          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },
      {
        path: "not-authed",
        element: <NotAuth />,
      },
      {
        path: "order-success",
        element: <SuccessfullOrder />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  );
}

export default App;
