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
  }
}

async function getTariff(token,product_code) {
  const url = "https://api.octopus.energy/v1/products/"
  try {
    const res = await fetch(`${url}${product_code}/electricity-tariffs/E-1R-${product_code}-A/standard-unit-rates/?page_size=5281`, {
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

async function getConsump(token, mpan, sn) {
  const url2 =  "https://api.octopus.energy/v1/"
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

module.exports = { getTariff, getConsump, getUserid}
