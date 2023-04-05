import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import SneakerPage, { action as createSneaker } from './pages/Sneaker';
import SneakerPage from './pages/Sneakers/screens/Sneaker';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './store/store';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: 'sneaker',
        element: <SneakerPage />,
      },
      {
        path: 'login'
      }
    ]
  }
])

function App() {
  return <Provider store={store}>
    <RouterProvider router={route} />
  </Provider>
}

export default App;
