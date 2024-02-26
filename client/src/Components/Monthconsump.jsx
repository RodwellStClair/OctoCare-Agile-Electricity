import { useSelector } from 'react-redux';
import spinner from '../icons/loading.gif';
import Consumpday from './Consumpdays';
import LineChart from './charts/LineChart';
import NavBar from './NavBar';

function Monthconsump() {
  const monsump = useSelector((state) => state.monConsump);

  return (
    <>
      <NavBar />
      <div className="consumption">
        <div className="consumption_header">
          <div className='date'>Date</div>
          <div className="consumption_values">Consumption</div>
        </div>
        {monsump.data.results ? (
          monsump.data.results.map((values, index) => {
            return (
              <Consumpday values={values} key={index} />
            )
          })
        ) : (
          <>
            <img src={spinner} alt="loading" />
            * <h1>Loading.......</h1> *
          </>
        )}
      </div>
      <div className="consumption-chart">
        {monsump.data.results ? (
          <LineChart consumpData={monsump.data.results} />
        ) : (
          <>
            <img src={spinner} alt="loading" />
            <h1>Loading....... </h1>
          </>
        )}
      </div>
    </>
  )
}

export default Monthconsump
