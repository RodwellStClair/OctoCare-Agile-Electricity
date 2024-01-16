import { configureStore } from '@reduxjs/toolkit';
import curTariff from './CurtariffState';
import consumpReducers from './Curconsumption';
import formReducer from './Formstate';

const store = configureStore({
  reducer: {
    curConsump: consumpReducers.curConsump,
    monConsump: consumpReducers.monConsump,
    quarterConsump: consumpReducers.quarterConsump,
    curTariff: curTariff,
    formReducer: formReducer,
  }
});

export default store;
