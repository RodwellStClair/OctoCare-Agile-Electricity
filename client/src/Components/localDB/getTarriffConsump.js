const OctopusUsersdb_Dayprices = require('./OctopusUsersdb_Dayprices.json')
const OctopusUsersdb_TARIFFS =require('./OctopusUsersdb_TARIFF.json') ;


function getTarriffConsump() {
  const tariffLocal = OctopusUsersdb_TARIFFS;
  const curconsumpLocal = OctopusUsersdb_Dayprices;
  return {tariffLocal,curconsumpLocal}
  };

export default getTarriffConsump;
