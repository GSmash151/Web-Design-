// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
// CORRECTED IMPORT: Import the default export (the reducer) from movieAppSlice.js
import movieAppReducer from './movieAppSlice'; 

export const store = configureStore({
  reducer: {
    // Assign your movieAppSlice reducer to the 'movieApp' key in your state
    movieApp : movieAppReducer
  },
});

// Optional: Log the store state to verify setup
console.log("Redux store initialized with state:", store.getState());
