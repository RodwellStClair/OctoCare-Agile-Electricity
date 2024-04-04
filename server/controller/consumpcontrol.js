const { transformConsump, mergeData } = require('./utilities');
const { getConsump } = require('./apiService');

async function getConsumpdb(product_code,token, mpan, sn, collection, tarriffdata) {
  try {
    const consumpdata = await collection.findOne({ Data: 'Consumption' });
    if (consumpdata) {
      const lastRefreshed = new Date(consumpdata.updatedAt).toISOString().split('T')[0]
      const today = new Date().toISOString().split('T')[0]
      if (lastRefreshed  === today) {
        return consumpdata;
      } else {
        try {
          const data = await getConsump(token, mpan, sn);
          const consumptiondata = transformConsump(data.results);
          const mergedData = mergeData(tarriffdata, consumptiondata);

          try {
            const updatedConsump = await collection.findOneAndUpdate({ Data: 'Consumption' },
              { $set: { Timeseries: mergedData } },
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
        const data = await getConsump(token, mpan, sn);
        const consumptiondata = transformConsump(data.results);
        const mergedData = mergeData(tarriffdata, consumptiondata);
        try {
          const newConsump = new collection({ Userid: product_code, Data: 'Consumption', Timeseries: mergedData });
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

module.exports = { getConsumpdb };
