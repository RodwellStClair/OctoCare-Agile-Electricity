import './Details.css'
import Tariffs from './Tariffs';
import spinner from '../icons/loading.gif';
import NavBar from './NavBar';
import { useData } from './custom hook/useData'
import Clock from './Clock';
import TariffLineChart from './charts/tarrifcharts/TariffLineChart';

function Details() {

  const { tariff } = useData();
  const maxtariff = tariff?.Timeseries ? Math.max(...tariff.Timeseries.map((item) => item.Tariff)) : 0;

  return (
    <div className='container'>
      <NavBar />
      <div className="tarrif_container">
        <div className="tarrif-table">
          <div className="tarrif_header">
            <h3>Time Period</h3><h3>Today's Tarrifs</h3>
          </div>
          <div className="tarrif_body">
            {tariff?.Timeseries ? (
              tariff.Timeseries.map((item, index) => {
                return (
                  <Tariffs item={item} maxtariff={maxtariff} key={index} />
                )
              })
            ) : (
              <>
                <img src={spinner} alt="loading" />
                <h1>Loading....... </h1>
              </>
            )}
          </div>
        </div>
        <div className="tarrif-chart">
          <div className="tarrif-chart-header">
            <h3>Tarrif Chart</h3>
          </div>
          {tariff?.Timeseries ? (
            <TariffLineChart tariffData={tariff.Timeseries} />
          ) : (
            <>
              <img src={spinner} alt="loading" />
              <h1>Loading....... </h1>
            </>
          )}
          <div className="tarrif-chart-footer">
            {tariff?.Timeseries ? (
              tariff.Timeseries.map((item, index) => {
                let [FromDate, FromTime] = item.From.split('T');
                let validFromHour = FromTime.split(':')[0] || 0;
                let validFromMinute = FromTime.split(':')[1] || 0;
                let currentTime = new Date();
                let currentHour = currentTime.getHours().toString().padStart(2, '0');
                let currentMinute = currentTime.getMinutes().toString().padStart(2, '0');
                if ((currentHour === validFromHour && validFromMinute === '00' && currentMinute < 30) || (currentHour === validFromHour && validFromMinute === '30' && currentMinute >= 30)) {
                  return (
                    <div key={index} className="tarrif-chart-footer-item">
                      <h3><strong>Current Tariff</strong> {item.Tariff.toFixed(1)} p/kwh</h3>
                    </div>
                  )
                }
                return null;
              })
            ) : (<><h6>Loading</h6> </>)}
            <Clock />
          </div>

        </div>
      </div>
    </div>
  )
}
export default Details
