const Bus = require('../models/bus');

exports.addOrUpdateBus = async (req, res) => {
  const { plate, arrivalTime } = req.body;

  try {
    let bus = await Bus.findOne({ plate });
    if (bus) {
      bus.arrivalTime = arrivalTime;
      bus.editCount += 1;
      await bus.save();
      return res.json(bus);
    } else {
      bus = new Bus({ plate, arrivalTime });
      await bus.save();
      return res.status(201).json(bus);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBus = async (req, res) => {
  const { plate } = req.params;

  try {
    const bus = await Bus.findOneAndDelete({ plate });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBus = async (req, res) => {
  const { plate } = req.params;

  try {
    const bus = await Bus.findOne({ plate });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
