import './Consumption.css'
import dayjs from 'dayjs'

function Consumption({ values }) {
  //console.log(values.consumption)
  return (
    <div className="consumption_container">
        <div className="date"><h3>{dayjs(values.interval_start).format('DD/MM/YYYY')}</h3></div>
        <div className="timefrom"><h3>{dayjs(values.interval_end).format('HH:mm')}</h3></div>
        <div className="timeto"><h3>{dayjs(values.interval_start).format('HH:mm')}</h3></div>
      <div className="consumption_values"><h3>{ Math.round(values.consumption * 100) / 100 }</h3></div>
    </div>
)
}

export default Consumption
