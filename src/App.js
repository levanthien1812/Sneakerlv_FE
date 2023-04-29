import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import AddSneakerPage from './pages/Sneakers/screens/AddSneaker';
import Layout from './components/layout';
import {
  Provider,
  useDispatch
} from 'react-redux';
import store from './store/store';
import {
  useEffect
} from 'react';
import SneakersPage, {
  sneakersLoader
} from './pages/Sneakers/screens/Sneakers';
import SneakerDetail, {
  sneakerLoader
} from './pages/Sneakers/screens/SneakerDetail';
import Cart, {
  cartLoader
} from './pages/Cart/screens/Cart';
import Home from './pages/Home/Home';

const route = createBrowserRouter([{
  path: '/',
  element: <Layout/>,
  children: [
    {
      index: true,
      element: <Home/> ,
    },
    {
      path: 'sneakers',
      children: [{
          index: true,
          loader: sneakersLoader,
          element: <SneakersPage/>
        },
        {
          path: 'add',
          element: <AddSneakerPage/>
        },
        {
          path: ':slug',
          loader: sneakerLoader,
          element: <SneakerDetail/>
        },
      ]
    },
    {
      path: 'cart',
      element: <Cart/> ,
    }
  ]
}])

function App() {
  return <Provider store = {store} >
    <RouterProvider router={route} />
  </Provider >
}

export default App;