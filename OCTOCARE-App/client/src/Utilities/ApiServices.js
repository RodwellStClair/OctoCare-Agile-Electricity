async function getProduct_code(url, token) {
  function getSegment(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token)
      },
    })
    const data = await res.json()
    const product = data.results[0].links[0].href
    const product_code = getSegment(product)
    return product_code

  } catch (error) {
    console.log( error);
  }
}

async function getTariff(url, token,product_code) {
  try {
    const res = await fetch(`${url}${product_code}/electricity-tariffs/E-1R-${product_code}-A/standard-unit-rates/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token)
      },
    })
    const data = await res.json()
    return data
    //console.log(data)
    }
   catch (error) {
    console.log('ERROR', error);
  }
}
//getTariff()

async function getElecMeterConsumption (url2, token, mpan, sn) {
  try {
    const res = await fetch(`${url2}electricity-meter-points/${mpan}/meters/${sn}/consumption/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token)
      },
    })
    const data = await res.json()
    return data
  }
   catch (error) {
    console.log('ERROR', error);
  }
}

//getMeterConsumption()

//const time = '2023-11-15T23:00:00Z'

export { getProduct_code,getTariff,getElecMeterConsumption}
