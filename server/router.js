const router = require('express').Router();
const {getTariffdb} = require('./controller/tarrifscontrol');
const {getUserid} = require('./controller/ApiService');
const { createUser} = require('./model/electtarifs');
const {getConsumpdb} = require('./controller/consumpcontrol');

router.post('/getdata', async (req, res) => {
  const token = req.body.token;
  const mpan = req.body.mpan;
  const sn = req.body.sn;
  const product_code  = await getUserid(req.body.token);
  const collection = await createUser(product_code);
  console.log('collection',collection)

  try {
    const tarriffdata = await getTariffdb(product_code, token,collection);
    res.status(200).send([tarriffdata,{'try':'trying this thing'}]);
    const comsumpdata = await getConsumpdb(product_code,token,mpan,sn,collection,tarriffdata);
    

  } catch (error) {
    console.log('Router ERROR', error);
  }
});

module.exports = router;
