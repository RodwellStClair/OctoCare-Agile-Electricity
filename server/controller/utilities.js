exports.transform = (data) => {
  return data.map(item => ({
    From: item.valid_from,
    To: item.valid_to,
    Tariff: item.value_inc_vat
  }));
}

exports.transformConsump = (data) => {
  return data.map(item => ({
    From: item.interval_start,
    To:item.interval_end,
    Consumption: item.consumption
  }));
}

exports.mergeData = (tariff, consump) => {

  const dataMap = new Map(tariff.Timeseries.map(item => [`${item.From}_${item.To}`, item]));

  const mergedData = consump.reduce((acc, item2) => {
    const key = `${item2.From}_${item2.To}`;
    const item1 = dataMap.get(key);

  if (item1) {
      acc.push({
        From: item1.From,
        To: item1.To,
        Tariff: item1.Tariff,
        Consumption: item2.Consumption,
        Cost: item1.Tariff * item2.Consumption
      });
    }
    return acc;
  }
  , []);
  return mergedData;
};

exports.calculateDayCost = (data) => {
  const dailyCosts = {};
    data.forEach(entry => {
        const date = entry.From.split('T')[0];
        const cost = entry.Cost;
        if (dailyCosts[date]) {
            dailyCosts[date] += cost;
        } else {
            dailyCosts[date] = cost;
        }
    });
    return Object.keys(dailyCosts).map(date => ({
        Date: date,
        Daycost: parseFloat((dailyCosts[date]/100).toFixed(2))
    }));
}
