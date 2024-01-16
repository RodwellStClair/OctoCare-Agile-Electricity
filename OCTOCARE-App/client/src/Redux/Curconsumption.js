import { getMonthConsump,getQuaterConsump,getElecMeterConsumption } from '../Utilities/ApiServices';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const curConsump = createAsyncThunk(
  'curConsump',
  async (cred,thunkAPI) => {
    const data = await getElecMeterConsumption(cred.url,cred.token,cred.mpan,cred.sn);
    return data;
  }
);

export const monConsump = createAsyncThunk(
  'monConsump',
  async (cred, thunkAPI) => {
    const data = await getMonthConsump(cred.url,cred.token,cred.mpan,cred.sn);
    return data;
  }
);

export const quarterConsump = createAsyncThunk(
  'quarterConsump',
  async (cred, thunkAPI) => {
    const data = await getQuaterConsump(cred.url,cred.token,cred.mpan,cred.sn);
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

const monConsumpSlice = createSlice({
  name: 'monTariff',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(monConsump.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(monConsump.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'success';
    });
    builder.addCase(monConsump.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

const quarterConsumpSlice = createSlice({
  name: 'quarterConsump',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(quarterConsump.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(quarterConsump.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'success';
    });
    builder.addCase(quarterConsump.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

const consumpReducers = {
  curConsump: curConsumpSlice.reducer,
  monConsump: monConsumpSlice.reducer,
  quarterConsump: quarterConsumpSlice.reducer
}
export default consumpReducers;
