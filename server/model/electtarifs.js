
const mongoose = require('mongoose')
const { dbConnection } = require('./db.js');
const { Schema } = mongoose;

// Tariff Schema
const timeseriesSchematar = new Schema({
  From: { type: String },
  To: { type: String },
  Tariff: { type: Number }
}, { _id: false });

const tariffdataSchema = new Schema({
  Userid: { type: String },
  Data: { type: String },
  Timeseries: [timeseriesSchematar]
}, { timestamps: true });

// Consumption Schema
const timeseriesSchemaconsump = new Schema({
  From: { type: String },
  To: { type: String },
  Tarriff: { type: Number },
  Consumption: { type: Number },
  Cost: { type: Number }
}, { _id: false });

const ConsumpdataSchema = new Schema({
  Userid: { type: String },
  Data: { type: String },
  Timeseries: [timeseriesSchemaconsump]
}, { timestamps: true });

const userconsump = (product_code) => {
  const modelName = `${product_code}`;
  const collection =  mongoose.model(modelName, ConsumpdataSchema, modelName);
  return collection;
}

async function createUser(product_code) {
  const modelName = `${product_code}`;
  const collection =  mongoose.models?.[modelName] || mongoose.model(modelName, tariffdataSchema);
  return collection;
}


module.exports = { createUser, userconsump }
