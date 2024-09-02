import styles from "./Navbar.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { searchAlbumApiAsync } from "../../redux/albumReducer";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";


export default function Navbar(){

    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

      //======= search the todo implemnts here =====//
      useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText) {
                dispatch(searchAlbumApiAsync({searchText:searchText}));
            }
        }, 300); 
    
        return () => clearTimeout(delayDebounceFn);
    }, [searchText, dispatch]);


    return(<>
        <div className={styles.navbarContainer}>
            <div className={styles.leftNavbar}>

                <div className={styles.navLogo}>
                    <Link to={"/"}>
                        AlbumList
                    </Link>
                </div>

                <div className={styles.searchContainer}>
                    <input value={searchText} onChange={(e)=>setSearchText(e.target.value)}
                     type="text" placeholder="Search album..." />
                    <MdOutlineSearch className={styles.searchIcon} />
                    
                </div>
            </div>

            <Link to={"/addalbum"}>
                <button className={styles.addButtn}>Add album</button>
            </Link>
           
        </div>


        <Outlet />

   </> )
}