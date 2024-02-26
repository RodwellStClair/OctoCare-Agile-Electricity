import './Details.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Tariffs from './Tariffs';
import Consumption from './Consumption';
import spinner from '../icons/loading.gif';
import LineChart from './charts/LineChart';
import { useSelector, useDispatch } from 'react-redux';
import { curTariff } from '../Redux/CurtariffState'
import { curConsump ,monConsump, quarterConsump } from '../Redux/Curconsumption'
import NavBar from './NavBar';

function Details({ credentials }) {

  const formData = useSelector((state) => state.formReducer.formdata);

  const {AccountAPI,mpan,sn} = formData;
  const token = AccountAPI + ":";
  const url = "https://api.octopus.energy/v1/products/";
  const url2 = "https://api.octopus.energy/v1/";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(curTariff({ url: url, token: token }))
    dispatch(curConsump({ url:url2, token:token, mpan:mpan,sn:sn}))
    dispatch(monConsump({ url:url2, token:token, mpan:mpan,sn:sn}))
    dispatch(quarterConsump({ url:url2, token:token, mpan:mpan,sn:sn}))
  }, [])

  const curconsump = useSelector((state) => state.curConsump);
  const tariff = useSelector((state) => state.curTariff);
 
  const consumpData = curconsump.data.results;
  return (
    <>
      <NavBar />
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
         {curconsump.data.results ?(
         <LineChart consumpData={consumpData} />
         ):(
            <>
            <img src={spinner} alt="loading" />
            <h1>Loading....... </h1>
            </>
          )}
      </div>
      <div className='footer'>
        <Link to="/">Logout</Link>
      </div>
    </>
  )
}
export default Details
