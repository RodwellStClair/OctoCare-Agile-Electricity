const router = require('express').Router();
const {getTariffdb} = require('./controller/tarrifscontrol');
const {getUserid} = require('./controller/ApiService');
const { createUser,userconsump} = require('./model/electtarifs');
const {getConsumpdb} = require('./controller/consumpcontrol');

router.post('/getdata', async (req, res) => {
  const token = req.body.token;
  const mpan = req.body.mpan;
  const sn = req.body.sn;
  const product_code  = await getUserid(req.body.token);
  const tarcollection = await createUser(product_code);
  const concollection = await userconsump(product_code);
  console.log('concollection',concollection)

  try {
    const tarriffdata = await getTariffdb(product_code, token,tarcollection);
    res.status(200).send([tarriffdata,{'try':'trying this thing'}]);
    const comsumpdata = await getConsumpdb(token,mpan,sn,concollection,tarriffdata);

  } catch (error) {
    console.log('Router ERROR', error);
  }
});

module.exports = router;