const { transform } = require('./utilities');
const { getTariff } = require('./ApiService');


async function getTariffdb(product_code, token, collection) {

  try {
    const tariffdata = await collection.findOne({ Data: 'Tariff' });
    if (tariffdata) {
      const lastRefreshed = new Date(tariffdata.updatedAt).toISOString().split('T')[0]
      const today = new Date().toISOString().split('T')[0]
      if (lastRefreshed === today) {
        return tariffdata;
      } else {
        try {

          const tariffdata = await getTariff(token, product_code);
          const data = transform(tariffdata.results);
          try {
            const updatedTariff = await collection.findOneAndUpdate({ Data: 'Tariff' },
              { $set: { Timeseries: data } },
              { new: true });
            return updatedTariff;
          } catch (error) {
            console.log('DB-ERROR', error);
          }
        } catch (error) {
          console.log('API-ERROR', error);
        }
      }
    } else {
      try {
        const tariffdata = await getTariff(url, token, product_code);
        const data = transform(tariffdata.results);
        try {
          const newTariff = new collection({ Userid: product_code, Data: 'Tariff', Timeseries: data });
          const savedTariff = await newTariff.save();
          return savedTariff;
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

module.exports = { getTariffdb };
