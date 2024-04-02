import { getElecMeterConsumption } from '../Utilities/ApiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const curConsump = createAsyncThunk(
  'curConsump',
  async (cred, thunkAPI) => {
    if(cred.product_code) {
      return await getElecMeterConsumption(cred.product_code);
    }

  }
);

const curConsumpSlice = createSlice({
  name: 'curConsump',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
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


const consumpReducers = {
  curConsump: curConsumpSlice.reducer
}
export default consumpReducers;
