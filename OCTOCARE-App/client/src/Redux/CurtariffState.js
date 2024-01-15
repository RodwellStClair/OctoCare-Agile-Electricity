import { getProduct_code, getTariff} from '../Utilities/ApiServices';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const curTariff = createAsyncThunk(
  'curTariff',
  async (cred, thunkAPI) => {
    const product_code = await getProduct_code(cred.url, cred.token);
    const data = await getTariff(cred.url, cred.token, product_code);
    return data;
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
