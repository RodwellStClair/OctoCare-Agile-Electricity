const {calculateDayCost} = require('./utilities');

async function updateDayPrice(product_code,collection,comsumpdata){
  try {
    const consumpdata = await collection.findOne({ Data:'Dayprices' });
    if (consumpdata) {
      const lastRefreshed = new Date(consumpdata.updatedAt).toISOString().split('T')[0]
      const today = new Date().toISOString().split('T')[0]
      if (lastRefreshed === today  ) {
        return consumpdata;
      } else {
        try {
          const data = calculateDayCost(comsumpdata.Timeseries);
          try {
            const updatedConsump = await collection.findOneAndUpdate({ Data: 'Dayprices' },
              { $set: { Timeseries: data } },
              { new: true });
            return updatedConsump;
          } catch (error) {
            console.log('DB-ERROR', error);
          }
        } catch (error) {
          console.log( error);
        }
      }
    } else {
      try {
        const data = calculateDayCost(comsumpdata.Timeseries);
        try {
          const newdayPrices = new collection({ Userid: product_code, Data: 'Dayprices', Timeseries: data });
          const savedConsump = await newdayPrices.save();
          return savedConsump;
        } catch (error) {
          console.log('DB-ERROR', error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  catch (error) {
    console.log('DB-ERROR', error);
  }
}

module.exports = {updateDayPrice};
