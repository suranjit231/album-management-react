import Navbar from "./components/navbar/Navbar";
import AlbumList from "./pages/albums/AlbumList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import AddAlbumForm from "./pages/addAlbum/AddAlbumForm";


function App() {

  // ========== create routing ==================//
  const router = createBrowserRouter([
    {path:"/", element:<Navbar /> , children:[

        {index:true, element:<AlbumList />},
        {path:"addalbum", element:<AddAlbumForm />},
        {path:"update-album/:albumId", element:<AddAlbumForm />}

    ]}
  ])




  return (
    <div className="App">
       <RouterProvider router={router} />
        <ToastContainer 
         toastClassName="custom-toast-container" />
    </div>
  );
}

export default App;
