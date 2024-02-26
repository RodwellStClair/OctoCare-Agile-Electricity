const url = "https://api.octopus.energy/v1/products/";
const url2 = "https://api.octopus.energy/v1/";
const token = "sk_live_McFKwOZVGnWB60y3VXuy458T:";
const product_code = 'AGILE-23-12-06';
const mpan = 1012509884923
const serial_number = '21L4244256'
//const tariff = getTariff(url, token, product_code);

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
    console.log( product_code)

  } catch (error) {
    console.log( error);
  }
}


async function getTariff(url, token,product_code) {
  try {
    const res = await fetch(`${url}${product_code}/electricity-tariffs/E-1R-${product_code}-A/standard-unit-rates/?page_size=5281`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token)
      },
    })
    const data = await res.json()
    console.log(data)
    }
   catch (error) {
    console.log('ERROR', error);
  }
}

async function getConsump(url2, token, mpan, sn) {
  try {
    const res = await fetch(`${url2}electricity-meter-points/${mpan}/meters/${sn}/consumption/?page_size=5281`, {
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
    console.log('API-ERROR', error);
  }
}

const consump = getConsump(url2, token, mpan, serial_number).then(data =>  console.log(data));
//console.log(consump)
