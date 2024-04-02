
const mongoose = require('mongoose')
const { dbConnection } = require('./db.js');
const { Schema } = mongoose;

// Tariff Schema
const timeseriesSchematar = new Schema({
  From: { type: String },
  To: { type: String },
  Tariff: { type: Number },
  Consumption: { type: Number },
  Cost: { type: Number },
  Date: { type: String },
  Daycost: { type: Number }
},
  { _id: false },
  { strict: false });

const ElectricdataSchema = new Schema({
  Userid: { type: String },
  Data: { type: String },
  Timeseries: [timeseriesSchematar]
},
  { timestamps: true },
  { strict: false }
);

//dynamic model creation
async function createUser(product_code) {
  const modelName = `${product_code}`;
  const collection = mongoose.models?.[modelName] || mongoose.model(modelName, ElectricdataSchema);
  return collection;
}


module.exports = { createUser }
