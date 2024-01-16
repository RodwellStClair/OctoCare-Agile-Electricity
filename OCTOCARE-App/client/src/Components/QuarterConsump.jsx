import { useSelector } from 'react-redux';
import { quarterConsump } from '../Redux/Curconsumption'
import spinner from '../icons/loading.gif';
import Consumpday from './Consumpdays';
import NavBar from './NavBar';
import LineChart from './charts/LineChart';

function QuarterConsump() {
const quartconsump = useSelector((state) => state.quarterConsump);

  return (
    <>
    <NavBar />
    <div className="consumption">
      <div className="consumption_header">
        <div className='date'>Date</div>
        <div className="consumption_values">Consumption</div>
      </div>
      {quartconsump.data.results ? (
        quartconsump.data.results.map((values, index) => {
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
        {quartconsump.data.results ? (
          <LineChart consumpData={quartconsump.data.results} />
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

export default QuarterConsump
