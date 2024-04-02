// Desc: This function takes in the current consumption data and returns the total cost for each month.

function getMonthCost(curconsump) {
  let monthCost = null;
  if (curconsump?.Timeseries) {
    let months;
    months = curconsump.Timeseries.reduce((acc, item) => {
      let month = item.Date.slice(5, 7);
      let cost = item.Daycost;
      if (acc[month]) {
        acc[month] += cost;
      } else {
        acc[month] = cost;
      }
      return acc;
    }, {})
    monthCost = { 'months': months };
  }
  if (monthCost) {
    let months = Object.keys(monthCost.months)
    let monthdates = {};
    let arrdates = [];
    for (let month in months) {
      let firstdate= new Date()  ;
      let lastdate = new Date('2024-02-01');
      curconsump?.Timeseries.map((item, index) => {
        if (item.Date.slice(5, 7) === months[month]) {
          let date = new Date(item.Date);
          if (date < firstdate) {
            firstdate = date ;
          }
          if (date > lastdate) {
            lastdate = date;
          }
        }
        return null;
      });
      arrdates.push( firstdate.toISOString().split('T')[0], lastdate.toISOString().split('T')[0]);
      monthdates[months[month]] = arrdates;
    }
    monthCost.monthdates = monthdates;
  }
  return monthCost;
};

export default getMonthCost;
