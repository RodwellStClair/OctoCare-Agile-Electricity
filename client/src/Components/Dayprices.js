import './Dayprices.css'
import dayjs from 'dayjs'

function Dayprices({ item }) {
  return (
    <div className="dayprice-container">
      <div className='date'><h3>{dayjs(item.Date).format('DD/MMM/YYYY')}</h3>  </div>
      <div className="cost"><h3>£ {item.Daycost.toFixed(1)}</h3></div>
    </div>
  )
}
export default Dayprices
