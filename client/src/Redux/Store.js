import { configureStore } from '@reduxjs/toolkit';
import curTariff from './CurtariffState';
import consumpReducers from './Curconsumption';

const store = configureStore({
  reducer: {
    curConsump: consumpReducers.curConsump,
    curTariff: curTariff,
  }
});

export default store;
