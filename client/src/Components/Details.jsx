import './Details.css'
import Tariffs from './Tariffs';
import spinner from '../icons/loading.gif';
import NavBar from './NavBar';
import { useData } from './custom hook/useData'
import Clock from './Clock';
import TariffLineChart from './charts/tarrifcharts/TariffLineChart';
import React, { useState, useEffect } from 'react';


function Details() {
  const [aspectRatio, setAspectRatio] = useState(true);
  let { tariff } = useData();
  let { tariffLocal } = useData()

  if (!tariff) { tariff = tariffLocal }

  const maxtariff = tariff?.Timeseries ? Math.max(...tariff.Timeseries.map((item) => item.Tariff)) : 0;

  //change change aspect ratio of the chart based on the screen size
  const handleResize = () => {
    if (window.screen.width > 700) {
      setAspectRatio(true)
    } else {
      setAspectRatio(false)

    }
  }
  useEffect(() => {

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='container'>
      <NavBar />
      <div className="tarrif_container">
        <div className="tarrif-table">
          <div className="tarrif_header">
            <h3>Time Period</h3><h3 id='tarif_responsive'>Today's Tarrifs</h3>
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
            <TariffLineChart tariffData={tariff.Timeseries}aspectRatio={aspectRatio} />
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
                let currentDate = new Date();
                let currentHour = currentDate.getHours().toString().padStart(2, '0');
                let currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
                if ((currentHour === validFromHour && validFromMinute === '00' && Number(currentMinute) < 30)
                  || (currentHour === validFromHour && validFromMinute === '30' && currentMinute >= 30)) {
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
