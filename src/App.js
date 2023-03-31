import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import SneakerPage, { action as createSneaker } from './pages/Sneaker';
import SneakerPage from './pages/Sneaker';

const route = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'sneaker',
        element: <SneakerPage />,
        // action: createSneaker
      }
    ]
  }
])

function App() {
  return <RouterProvider router={route}/>
}

export default App;
