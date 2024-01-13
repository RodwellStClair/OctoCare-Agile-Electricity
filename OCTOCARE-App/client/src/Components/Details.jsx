import './Details.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Tariffs from './Tariffs';
import Consumption from './Consumption';
import spinner from '../icons/loading.gif';
import { getProduct_code, getTariff, getElecMeterConsumption } from '../Utilities/ApiServices';
import LineChart from './charts/LineChart';

function Details({ credentials }) {
  const token = credentials.AccountAPI + ":";
  const url = "https://api.octopus.energy/v1/products/";
  const url2 = "https://api.octopus.energy/v1/";
  const mpan = credentials.MeterpointMPAN;
  const sn = credentials.meterSN;
  const date = credentials.date + "T00:00:00Z";
  //console.log(mpan, sn, date)

  const [data, setdata] = useState([]);
  const [consumpData, setConsumpData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const product_code = await getProduct_code(url, token);
        const tariff = await getTariff(url, token, product_code);
        //console.log(tariff)
        setdata(tariff.results)
        //console.log(data)
      } catch (error) {
        console.log('ERROR', error);
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const elecTariff = await getElecMeterConsumption(url2, token, mpan, sn, date);
        setConsumpData(elecTariff.results)
        //console.log(consumpData)
      } catch (error) {
        console.log('ERROR', error);
      }
    })()
  }, [])

  return (
    <>
    <div className="details_container">
      <div className='Details'>
        <div className="tarrif">
          <div className="tarrif_header">
            <div className='date'>Date</div>
            <div className="timefrom">Time From</div>
            <div className="timeto">Time To</div>
            <div className="cost">Current Tarrif</div>
          </div>
          {data ? (
            data.map((item, index) => {
              return (
                <Tariffs item={item} key={index} />
              )
            })
          ) : (
            <>
              <img src={spinner} alt="loading" />
              {/* <h1>Loading....... </h1> */}
            </>
          )}
        </div>
        <div className="consumption">
          <div className="consumption_header">
            <div className='date'>Date</div>
            <div className="timefrom">Time From</div>
            <div className="timeto">Time To</div>
            <div className="consumption_values">Consumption</div>
          </div>
          {consumpData ? (
            consumpData.map((values, index) => {
              return (
                <Consumption values={values} key={index} />
              )
            })
          ) : (
            <>
              <img src={spinner} alt="loading" />
              {/* <h1>Loading.......</h1> */}
            </>
          )}

        </div>
      </div>
    </div>
    <div className="consumption-chart">
        <LineChart consumpData ={consumpData} /> </div>
      <div className='footer'>
        <Link to="/">Logout</Link>
      </div>
    </>
  )
}
export default Details
