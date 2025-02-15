const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
  ComputerName: {
    type: String,
    required: true,
    unique: true,
  },
  ComputerPicture: {
    type: String,
    required: true,
  },
  ComputerRam: {
    type: String,
    required: true,
  },
  ComputerRom: {
    type: String,
    required: true,
  },
  ComputerDiskType: {
    type: String,
    required: true,
  },
  ComputerScreenInch: {
    type: String,
    required: true,
  },
  ComputerProcessor: {
    type: String,
    required: true,
  },
  ComputerProcessorFrequency: {
    type: String,
    required: true,
  },
  ComputerHeart: {
    type: String,
    required: true,
  },
  ComputerIntegratedGpu: {
    type: String,
    required: true,
  },
  ComputerDedicatedGpu: {
    type: String,
    required: true,
  },
  ComputerKeyboard: {
    type: String,
    required: true,
  },
  ComputerKeyboardLight: {
    type: String,
    required: true,
  },
  ComputerSimCard: {
    type: String,
    required: true,
  },
  ComputerOs: {
    type: String,
    required: true,
  },
  ComputerBattery: {
    type: String,
    required: true,
  },
  ComputerTouchScreen: {
    type: String,
    required: true,
  },
  ComputerRJ45: {
    type: String,
    required: true,
  },
  ComputerUSBNumber: {
    type: Number,
    required: true,
  },
  ComputerHDMI: {
    type: String,
    required: true,
  },
  ComputerVGA: {
    type: String,
    required: true,
  },
  ComputerType_C: {
    type: String,
    required: true,
  },
  ComputerPortJack: {
    type: String,
    required: true,
  },
  ComputerType: {
    type: String,
    required: true,
  },
  ComputerDesignedFor: {
    type: String,
    required: true,
  },
  ComputerAvailableYear: {
    type: Number,
    required: true,
  },
  ComputerStock: {
    type: String,
    required: true,
  },
  ComputerPrice: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model("computers-products", ComputerSchema);