import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loadingAlbum: false,
    albums: [],
    totalAlbums: 0,
    currentPage: 1,
    limit: 10,
    error: null,
};

//====== async thunk api call for initial album state ===============//
export const getInitialAlbumApiAsync = createAsyncThunk(
    "album/getInitialAlbumApi",
    async ({ limit, page }, thunkApi) => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/albums`, {
          params: {
            _limit: limit,
            _page: page,
          },
        });
        const total = res.headers['x-total-count'];
        return { data: res.data, total: parseInt(total, 10), page, limit };
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
    }
  );

//===== async thunk api call for delete an album ===================//
export const deleteAlbumApiAsync = createAsyncThunk("album/deleteAlbumApi", 
    async(arg, thunkApi) => {
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/albums/${arg}`);
            if(res.status === 200){
                return {id:arg, status:res.status};
            }
        } catch(error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);

//====== async add new album api call ================================//
export const addNewAlbumApiAsync = createAsyncThunk("album/addNewAlbumApi", 
    async(arg, thunkApi) => {
       try {
        
            const res = await axios.post(`https://jsonplaceholder.typicode.com/albums`, arg);
            return res.data;

       } catch(error) {
            return thunkApi.rejectWithValue(error.response.data.message);
       }
    }
);

//====== async update albums api call =================================//
export const updateAlbumApiAsync = createAsyncThunk("album/updateAlbumApi",
    async(arg, thunkApi)=>{
        try{
            const {id } = arg;
            const res = await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, arg);
            return res.data;

        }catch(error){
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
)

//====== async thunk search api call =========//
export const searchAlbumApiAsync = createAsyncThunk("album/searchAlbumApiAsync",
    async (arg, thunkApi) => {
        try {
            const { searchText } = arg;
           
            const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/`);
            // Filter albums based on the search text
            const filteredAlbums = res.data.filter(album => 
                album.title.toLowerCase().includes(searchText.toLowerCase())
            );

           // console.log("Filtered albums: ", filteredAlbums);

            return filteredAlbums;

        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data.message);
        }
    }
);

// Helper function to handle pending and rejected cases
const handlePending = (state) => {
    state.loadingAlbum = true;
};

const handleRejected = (state, action) => {
    state.error = action.payload;
    state.loadingAlbum = false;
};

//======= create slice for creating reducers managing state of albums ==========//
const albumSlice = createSlice({
    name: "album",
    initialState: initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder //=== fetch all albums state updating  =====//
            .addCase(getInitialAlbumApiAsync.pending, handlePending)
            .addCase(getInitialAlbumApiAsync.fulfilled, (state, action) => {
                state.albums = action.payload.data;
                state.totalAlbums = action.payload.total;
                state.currentPage = action.payload.page;
                state.limit = action.payload.limit;
                state.loadingAlbum = false;
              })
            .addCase(getInitialAlbumApiAsync.rejected, handleRejected)

              //====== manage state for deleting a album status =======//
            .addCase(deleteAlbumApiAsync.pending, handlePending)
            .addCase(deleteAlbumApiAsync.fulfilled, (state, action) => {
                state.albums = state.albums.filter((album) => album.id !== action.payload.id);
                state.loadingAlbum = false;
            })
            .addCase(deleteAlbumApiAsync.rejected, handleRejected)

            //======= update state based on the status of addNew album api calls ====//
            .addCase(addNewAlbumApiAsync.pending, handlePending)
            .addCase(addNewAlbumApiAsync.fulfilled, (state, action) => {
                //console.log("action.payload:", action.payload);
                 state.albums.push({...action.payload});
                state.loadingAlbum = false;
                console.log("albums: ", JSON.parse(JSON.stringify(state.albums)));
            })
            .addCase(addNewAlbumApiAsync.rejected, handleRejected)

            //======== update state based on status of updateAlbum api call ======//
            .addCase(updateAlbumApiAsync.pending, handlePending)
            .addCase(updateAlbumApiAsync.fulfilled, (state, action)=>{
                state.albums = state.albums.map((album)=>{
                    if(album.id===action.payload.id){
                        album = action.payload
                    }

                    return album;
                });

                state.loadingAlbum = false;

               // console.log("updated albums: ", state.albums);

            })
            .addCase(updateAlbumApiAsync.rejected, handleRejected)

            //======= update state for search api =========//
            .addCase(searchAlbumApiAsync.pending, handlePending)
            .addCase(searchAlbumApiAsync.fulfilled, (state, action)=>{
                state.albums = [...action.payload];
                state.loadingAlbum = false;

            })
            .addCase(searchAlbumApiAsync.rejected, handleRejected);
    }
});

export const albumReducer = albumSlice.reducer;
export const { setPage } = albumSlice.actions;
export const albumSelector = (state) => state.albumReducer;
