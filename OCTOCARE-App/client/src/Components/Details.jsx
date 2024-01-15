import './Details.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Tariffs from './Tariffs';
import Consumption from './Consumption';
import spinner from '../icons/loading.gif';
import LineChart from './charts/LineChart';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { curTariff } from '../Redux/CurtariffState'
import { curConsump, monComsump, quarterConsump } from '../Redux/Curconsumption'

function Details({ credentials }) {
  // variables storing user inputs from form page
  const token = credentials.AccountAPI + ":";
  const mpan = credentials.MeterpointMPAN;
  const sn = credentials.meterSN;
  const date = credentials.date + "T00:00:00Z";

  const url = "https://api.octopus.energy/v1/products/";
  const url2 = "https://api.octopus.energy/v1/";

  const dispatch = useDispatch();
  const tariff = useSelector((state) => state.curTariff);
  const curconsump = useSelector((state) => state.curConsump);
  // state variables to store cur tarrif rates from api call
  const [curtardata, setcurtardata] = useState([]);

  // state variables to store user consumption from api call
  //const [consumpData, setConsumpData] = useState([]);
  useEffect(() => {
    dispatch(curTariff({ url: url, token: token }))
    dispatch(curConsump({ url: url2, token: token, mpan: mpan, sn: sn }))
  }, [])

 console.log('curconsump', curconsump)
  return (
    <>
      <div className="details_container">
        <div className='Details'>
          <div className="tarrif">
            <div className="tarrif_header">
              <div className='date'>Time Period</div>
              <div className="cost">Current Tarrif</div>
            </div>
            {tariff.data.results ? (
              tariff.data.results.map((item, index) => {
                return (
                  <Tariffs item={item} key={index} />
                )
              })
            ) : (
              <>
                <img src={spinner} alt="loading" />
                <h1>Loading....... </h1>
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
            {curconsump.data.results ? (
              curconsump.data.results.map((values, index) => {
                return (
                  <Consumption values={values} key={index} />
                )
              })
            ) : (
              <>
                <img src={spinner} alt="loading" />
                * <h1>Loading.......</h1> *
              </>
            )}
          </div>
        </div>
      </div>
      <div className="consumption-chart">
        <LineChart consumpData={curconsump.data.results} />
      </div>
      <div className='footer'>
        <Link to="/">Logout</Link>
      </div>
    </>
  )
}
export default Details
