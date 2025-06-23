// /src/store/movieAppSlice

import { createSlice } from '@reduxjs/toolkit';

const initialState  = {
    bannerData : [],
    imageURL : ""

}

export const movieAppSlice = createSlice({
    name: 'movieApp',
    initialState,
    reducers : {
        setBannerData : (state,action) => {
            state.bannerData = action.payload
        },
        setImageURL : (state,action) => (
            state.imageURL = action.payload
        )
    }
})

export const {setBannerData, setImageURL} = movieAppSlice.actions

export default movieAppSlice.reducer