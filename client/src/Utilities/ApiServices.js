// Desc: API services for fetching data from the server
async function getTariff(token, mpan, sn,product_code) {
  const url = 'http://127.0.0.1:3090/getdata';
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'token': token, 'mpan': mpan, 'sn': sn,'product_code': product_code }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('FE Error', error);
  }
}

async function getElecMeterConsumption(product_code) {
  const url = `http://127.0.0.1:3090/getdayprices/${product_code}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log('ERROR', error);
  }
}

async function getUserid(token) {
  const url = "https://api.octopus.energy/v1/products/"
  function getSegment(uri) {
    const parts = uri.split('/');
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
    console.log('API-ERROR', error);
  }}


export { getTariff, getElecMeterConsumption,getUserid }
