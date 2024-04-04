import './Tariffs.css'
import dayjs from 'dayjs'


function Tariffs({ item, maxtariff }) {
  const secMax = maxtariff - 5;
  const lowMax = secMax - 10;

  return (
    <div className={
   `${item.Tariff === maxtariff ? "tar-row-max" : "tar-row"}
    ${item.Tariff < maxtariff && item.Tariff > secMax ? "tar-row-mid" : "tar-row"}
    ${item.Tariff <= secMax && item.Tariff > lowMax ? "tar-row-low" : "tar-row"}`
    }>
      <div className='datetime'>
        <div className='time'>
          <div className="timefrom"><h3>{ item.From.split('T')[1].slice(0, 5)}</h3></div>
          <div className="timeto"><h3>{item.To.split('T')[1].slice(0, 5)}</h3></div>
        </div>
        <div className='date'></div><h4>{dayjs(item.From).format('D/MMM/YYYY')}</h4>
      </div>
      <div className="cost"><h3>{item.Tariff.toFixed(1)}</h3><p>p/kwh</p></div>
    </div>
  )
}
export default Tariffs
