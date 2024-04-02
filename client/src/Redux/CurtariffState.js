import { getTariff} from '../Utilities/ApiServices';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const curTariff = createAsyncThunk(
  'curTariff',
  async (cred, thunkAPI) => {

    return await getTariff(cred.token, cred.mpan, cred.sn,cred.product_code);
  }
);

const curTariffSlice = createSlice({
  name: 'curTariff',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(curTariff.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(curTariff.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'success';
    });
    builder.addCase(curTariff.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

export default curTariffSlice.reducer;
