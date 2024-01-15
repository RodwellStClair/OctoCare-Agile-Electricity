import { getProduct_code, getTariff, getElecMeterConsumption } from '../apiService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const curConsump = createAsyncThunk(
  'curTariff',
  async (cred,thunkAPI) => {
    const product_code = await getProduct_code(cred.url2, cred.token);
    const data = await getTariff(cred.url2, cred.token,product_code);
    return data;
  }
);

 const curConsumpSlice = createSlice({
  name: 'curConsump',
  initialState: {
    data: [],
    status: null,
  },
   reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(curConsump.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(curConsump.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'success';
    });
    builder.addCase(curConsump.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});



export default curConsumpSlice.reducer;
