const router = require('express').Router();
const { getTariffdb } = require('./controller/tarrifscontrol');
const { createUser } = require('./model/electschema');
const { getConsumpdb } = require('./controller/consumpcontrol');
const { updateDayPrice } = require('./controller/consumpdayprices')

router.post('/getdata', async (req, res) => {
  const token = req.body.token;

  const mpan = req.body.mpan;
  const sn = req.body.sn;
  const product_code = req.body.product_code;

  if (product_code) {
    const collection = await createUser(product_code);
    try {
      const tarriffdata = await getTariffdb(product_code, token, collection).then(
        (data) => {
          const tarifftomorrow = { ...data._doc }
          tarifftomorrow.Timeseries = data.Timeseries.slice(0, 48)
          res.status(200).send(tarifftomorrow);
          return data;
        }
      );
      const comsumpdata = await getConsumpdb(product_code, token, mpan, sn, collection, tarriffdata);
      await updateDayPrice(product_code, collection, comsumpdata);
    } catch (error) {
      console.log('Router ERROR', error);
    }
  }
});

router.get('/getconsumption/:product_code', async (req, res) => {
  const product_code = req.params.product_code
  const collection = await createUser(product_code);
  try {
    const consumpdata = await collection.findOne({ Data: 'Consumption' });
    if (consumpdata) {
      res.status(200).send(consumpdata);
    } else {
      res.status(404).send('No consumption data found');
    }
  } catch (error) {
    console.log('Router ERROR', error);
  }
});

router.get('/getdayprices/:product_code', async (req, res) => {
  const product_code = req.params.product_code;
  if (product_code) {
    const collection = await createUser(product_code);
    try {
      const consumpdata = await collection.findOne({ Data: 'Dayprices' });
      
      if (consumpdata) {
        res.status(200).send(consumpdata);
      } else {
        res.status(404).send('No data found');
      }
    } catch (error) {
      console.log('Router ERROR', error);
    }
  }
});

module.exports = router;
