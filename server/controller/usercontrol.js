
async function getcreateUserid(token) {
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

module.exports = { getcreateUserid }
