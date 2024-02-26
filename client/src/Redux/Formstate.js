import { createSlice } from '@reduxjs/toolkit';

export const getformdataSlice = createSlice({
  name: 'formData',
  initialState:{
    formdata:{},
  },
  reducers: {
    getformdata: (state, action) => {
      state.formdata =action.payload;
    },
  },
});

export const { getformdata} = getformdataSlice.actions;
export default getformdataSlice.reducer;
