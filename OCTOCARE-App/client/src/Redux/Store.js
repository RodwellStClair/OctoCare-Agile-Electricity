import { configureStore } from '@reduxjs/toolkit';
import curTariff from './CurtariffState';
import consumpReducers from './Curconsumption';

const store = configureStore({
  reducer: {
    curConsump: consumpReducers.curConsump,
    monConsump: consumpReducers.monConsump,
    quarterConsump: consumpReducers.quarterConsump,
    curTariff: curTariff,
  }
});

export default store;
