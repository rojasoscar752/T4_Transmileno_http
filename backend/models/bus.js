const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  plate: { type: String, required: true, unique: true },
  arrivalTime: { type: Date, required: true },
  editCount: { type: Number, default: 0 },
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
