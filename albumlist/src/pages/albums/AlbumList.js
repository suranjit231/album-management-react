import styles from "./AlbumList.module.css";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { getInitialAlbumApiAsync, albumSelector, deleteAlbumApiAsync, setPage } from "../../redux/albumReducer";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AlbumList() {
  const dispatch = useDispatch();
  const { loadingAlbum, albums, error, totalAlbums, currentPage, limit } = useSelector(albumSelector);
 // console.log("albums: ", albums)

  useEffect(() => {
    dispatch(getInitialAlbumApiAsync({ limit, page: currentPage }));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  async function handleDeleteAlbum(id) {
    const result = await dispatch(deleteAlbumApiAsync(id));
    //console.log("result for delete album: ", result);
    if (result.payload?.status === 200) {
      toast.success("Album is deleted.");
      //dispatch(getInitialAlbumApiAsync({ limit, page: currentPage }));
    }
  }

  const totalPages = Math.ceil(totalAlbums / limit);

  return (
    <>
      {loadingAlbum ? (
        <div className={styles.loaderContainer}>
          <ClipLoader color="red" loading={loadingAlbum} size={60} />
        </div>
      ) : (
        <div className={styles.albumListContainer}>
          {albums && albums.map((album) => (
            <div className={styles.albumBox} key={album.id}>
              <div className={styles.albumImageBox}>
                <img
                  src="https://c4.wallpaperflare.com/wallpaper/614/675/661/beautiful-pictures-nature-waterfall-wallpaper-preview.jpg"
                  alt="AlbumImage"
                />
              </div>
              <p className={styles.albumTitle}>{album.title}</p>
              <div className={styles.albumActionsControl}>
                <Link to={`/update-album/${album.id}`}>
                  <FaRegEdit className={styles.editIcon} />
                </Link>
                <MdDelete onClick={() => handleDeleteAlbum(album.id)} className={styles.deleteIcon} />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePageButton : ''}`}
            onClick={() => dispatch(setPage(index + 1))}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
