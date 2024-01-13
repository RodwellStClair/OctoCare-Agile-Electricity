import './Tariffs.css'
import dayjs from 'dayjs'

function Tariffs({ item }) {

  return (
    <div className="tar-row">
      <div className='date'><h3>{dayjs(item.valid_from).format('DD/MM/YYYY')}</h3></div>
      <div className="timefrom"><h3>{dayjs(item.valid_to).format('HH:mm')}</h3></div>
      <div className="timeto"><h3>{dayjs(item.valid_from).format('HH:mm')}</h3></div>
      <div className="cost"><h3>{Math.round(item.value_inc_vat * 100) / 100}</h3></div>
    </div>
  )
}
export default Tariffs
