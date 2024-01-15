import './Tariffs.css'
import dayjs from 'dayjs'

function Tariffs({ item }) {

  return (
    <div className="tar-row">
      <div className='datetime'>
        <div className='time'>
          <div className="timefrom"><h3>{dayjs(item.valid_to).format('HH:mm')}</h3></div>
          <div className="timeto"><h3>{dayjs(item.valid_from).format('HH:mm')}</h3></div>
        </div>
        <div className='date'></div><h4>{dayjs(item.valid_from).format('D/MMM/YYYY')}</h4>
      </div>
      <div className="cost"><h3>{Math.round(item.value_inc_vat * 100) / 100}</h3></div>
    </div>
  )
}
export default Tariffs
