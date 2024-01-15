import { getProduct_code, getTariff, getMonthTariff, getQuaterTariff, getElecMeterConsumption } from '../apiService';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const curTariff = createAsyncThunk(
  'curTariff',
  async (cred, thunkAPI) => {
    const product_code = await getProduct_code(cred.url, cred.token);
    const data = await getTariff(cred.url, cred.token, product_code);
    return data;
  }
);

export const monTariff = createAsyncThunk(
  'monTariff',
  async (cred, thunkAPI) => {
    const product_code = await getProduct_code(cred.url, cred.token);
    const data = await getMonthTariff(cred.url, cred.token, product_code);
    return data;
  }
);

export const QuarterTariff = createAsyncThunk(
  'QuarterTariff',
  async (cred, thunkAPI) => {
    const product_code = await getProduct_code(cred.url, cred.token);
    const data = await getQuaterTariff(cred.url, cred.token, product_code);
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
const monTariffSlice = createSlice({
  name: 'monTariff',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(monTariff.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(monTariff.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'success';
    });
    builder.addCase(monTariff.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

const QuarterTariffSlice = createSlice({
  name: 'QuarterTariff',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(QuarterTariff.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(QuarterTariff.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'success';
    });
    builder.addCase(QuarterTariff.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

const Tareducers = {
  curTariff: curTariffSlice.reducer,
  monTariff: monTariffSlice.reducer,
  QuarterTariff: QuarterTariffSlice.reducer
}
export default Tareducers;
