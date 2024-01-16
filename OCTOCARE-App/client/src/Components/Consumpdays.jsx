import './Consumption.css'
import dayjs from 'dayjs'

function Consumpday({ values }) {
  return (
    <div className="consumption_container">
      <div className="timefrom"><h3>{dayjs(values.interval_end).format('DD/MM/YYYY')}</h3></div>
      <div className="consumption_values"><h3>{Math.round(values.consumption * 100) / 100}</h3></div>
    </div>
  )
}

export default Consumpday
