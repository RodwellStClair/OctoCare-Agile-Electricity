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
