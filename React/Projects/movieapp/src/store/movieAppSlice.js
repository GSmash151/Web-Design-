// src/store/movieAppSlice.js (Corrected code)
import { createSlice } from '@reduxjs/toolkit';

const movieAppSlice = createSlice({
  name: 'movieApp',
  initialState: {
    bannerData: {},
    imageURL: "",
  },
  reducers: {
    setBannerData: (state, action) => {
      // Correct: Only mutate the draft
      state.bannerData = action.payload;
    },
    setImageURL: (state, action) => {
      // Correct: Only mutate the draft
      state.imageURL = action.payload;
    },
  },
});

export const { setBannerData, setImageURL } = movieAppSlice.actions;
export default movieAppSlice.reducer;