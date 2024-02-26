const { transformConsump } = require('./utilities');
const { getConsump } = require('./ApiService');

async function getConsump(token,mpan,sn){
  const url = "https://api.octopus.energy/v1/"
  try {
    const consumpdata = await collection.findOne({ Data:'Consumption' });
    if (consumpdata) {
      const lastRefreshed = new Date(consumpdata.updatedAt).toISOString().split('T')[0]
      const today = new Date().toISOString().split('T')[0]
      if (lastRefreshed === today) {
        return consumpdata;
      } else {
        try {
          const consumpdata = await getConsump(url,token,mpan,sn);
          const data = transformConsump(consumpdata.results);
          try {
            const updatedConsump = await collection.findOneAndUpdate({ Data: 'Consumption' },
              { $set: { Timeseries: data } },
              { new: true });
            return updatedConsump;
          } catch (error) {
            console.log('DB-ERROR', error);
          }
        } catch (error) {
          console.log('API-ERROR', error);
        }
      }
    } else {
      try {
        const consumpdata = await getConsump(url,token,mpan,sn);
        const data = transform(consumpdata.results);
        try {
          const newConsump = new collection({ Userid: product_code, Data: 'Consumption', Timeseries: data });
          const savedConsump = await newConsump.save();
          return savedConsump;
        } catch (error) {
          console.log('DB-ERROR', error);
        }
      } catch (error) {
        console.log('API-ERROR', error);
      }
    }
  }
  catch (error) {
    console.log('DB-ERROR', error);
  }
}

module.exports = {getConsumpdb: getConsump};
