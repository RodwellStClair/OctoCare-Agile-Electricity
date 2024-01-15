import { configureStore } from '@reduxjs/toolkit';
import Tareducers from './CurtariffState';
import curConsump from './Curconsumption';

const store = configureStore({
  reducer: {
    curTariff: Tareducers.curTariff,
    monTariff: Tareducers.monTariff,
    QuarterTariff: Tareducers.QuarterTariff,
    curConsump: curConsump,
  }
});

export default store;
