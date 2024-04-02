import './Consumption.css';
import NavBar from './NavBar';
import { useData } from './custom hook/useData';
import Dayprices from './Dayprices';
import ConsumpBarChart from './charts/ConsumpBarChart';
import getMonthCost from '../Utilities/getMonthCost';
import dayjs from 'dayjs';

function Consumption() {
  const { curconsump } = useData();
  const MonthCost = getMonthCost(curconsump);

  return (
    <div className="container">
      <NavBar />
      <div className="consump-container">
        <div className="consump-table">
          <div className="consump-table-header">
            <h3>Date</h3><h3>Consumption Cost</h3>
          </div>
          <div className="consump-table-body">
            {curconsump?.Timeseries ? (
              curconsump.Timeseries.map((item, index) => {
                return (
                  <Dayprices item={item} key={index} />
                )
              })
            ) : (
              <>
                <h1>Loading....... </h1>
              </>
            )}
          </div>
        </div>
        <div className="consump-chart">
          <div className="consump-chart-header">
            <h3>Consumption Chart</h3>
          </div>
          {curconsump?.Timeseries ? (
            <ConsumpBarChart ConsumpData={curconsump.Timeseries} />
          ) : (<h1>Loading....... </h1>)}
          <div className="consump-chart-footer">
            <h3>Month Consumption</h3>
            {
              MonthCost ? (
                Object.keys(MonthCost.months).map((item, index) => {
                  return (
                    <div key={index} className="consump-chart-footer-item">
                      <h3>From {dayjs(MonthCost.monthdates[item][0]).format('DD/MMM/YYYY')}
                      - {dayjs(MonthCost.monthdates[item][1]).format('DD/MMM/YYYY')}:
                      £ {MonthCost.months[item].toFixed(2)}</h3>
                    </div>
                  )
                })
              ) : <h6>Loading</h6>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consumption
