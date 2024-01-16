/*   useEffect(() => {
    (async () => {
      try {
        const product_code = await getProduct_code(url, token);
        const tariff = await getTariff(url, token, product_code);
        setdata(tariff.results)
      } catch (error) {
        console.log('ERROR', error);
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const elecTariff = await getElecMeterConsumption(url2, token, mpan, sn, date);
        setConsumpData(elecTariff.results)
      } catch (error) {
        console.log('ERROR', error);
      }
    })()
  }, []) */

  // variables storing user inputs from form page
  //const token = credentials.AccountAPI + ":";
  //const mpan = credentials.MeterpointMPAN;
  //const sn = credentials.meterSN;
  //const date = credentials.date + "T00:00:00Z";
  // state variables to store cur tarrif rates from api call
  //const [curtardata, setcurtardata] = useState([]);

  // state variables to store user consumption from api call
  //const [consumpData, setConsumpData] = useState([]);
