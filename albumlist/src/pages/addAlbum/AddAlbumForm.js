import { useState, useEffect } from "react";
import styles from "./AddAlbumForm.module.css";
import { addNewAlbumApiAsync, getInitialAlbumApiAsync, albumSelector, updateAlbumApiAsync } from "../../redux/albumReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useLocation, useParams } from "react-router-dom";

export default function AddAlbumForm() {
  const [isUpdateAlbum, setIsUpdateAlbum] = useState(false);
  const [albumText, setAlbumText] = useState("");
  const { loadingAlbum, albums, error } = useSelector(albumSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const { albumId } = useParams();
  const album = location.state?.album; // Get album from location state

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getInitialAlbumApiAsync({ limit: 10, page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === `/update-album/${albumId}`) {
      if (albums) {
        const updateAbleAlbum = albums.find((a) => a.id === Number(albumId));
        if (updateAbleAlbum) {
          setIsUpdateAlbum(updateAbleAlbum);
          setAlbumText(updateAbleAlbum.title || "");
        }
      }
    }
  }, [location.pathname, albumId, albums]);

  //====== function for handle add album form submit =========//
  async function handleSubmitAddForm(e) {
    e.preventDefault();
    if (!albumText) return;
    try {
      const result = await dispatch(addNewAlbumApiAsync({ title: albumText, userId: 1 }));
      toast.success("New album is added.");
      clearInput();
    } catch (error) {
      console.log("error: ", error);
    }
  }

  //======= handle submit update form =========
  async function handleSubmitUpdateForm(e) {
    e.preventDefault();
    if (!albumText) return;
    try {
      const result = await dispatch(updateAlbumApiAsync({title:albumText, id:albumId, userId:isUpdateAlbum.userId}));
      
      if(result?.payload){
            toast.success("album is updated.");
            clearInput();
      }
    
    } catch (error) {
      console.log("error: ", error);
    }
  }

  //======= function clear input ================//
  function clearInput() {
    setAlbumText("");
  }

  return (
    <div className={styles.addAlbumFormContainer}>
      <h2>{isUpdateAlbum ? "Update Album" : "Add New Album"}</h2>

      <form onSubmit={isUpdateAlbum ? handleSubmitUpdateForm : handleSubmitAddForm}>
        <div className={styles.formControl}>
          <input
            value={albumText}
            onChange={(e) => setAlbumText(e.target.value)}
            type="text"
            placeholder="Album text..."
          />
        </div>
        <button className={styles.formSubmitBtn}>
          {loadingAlbum ? (
            <ClipLoader color="blue" loading={loadingAlbum} size={20} />
          ) : (
            isUpdateAlbum ? "Update-album" : "Add-album"
          )}
        </button>
      </form>
    </div>
  );
}
