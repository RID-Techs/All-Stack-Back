const mongoose = require('mongoose');

const MobileProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productPicture: {
        type: String,
        required: true
    },
    productRam: {
        type: String,
        required: true
    },
    productRom: {
        type: String,
        required: true
    },
    productScreenType: {
        type: String,
        required: true
    },
    productDisplayResolution: {
        type: String,
        required: true
    },
    productMainCamera: {
        type: Number,
        required: true
    },
    productFrontCamera: {
        type: Number,
        required: true
    },
    productDualSim: {
        type: String,
        required: true
    },
    productEsim: {
        type: String,
        required: true
    },
    productMermorySlot: {
        type: String,
        required: true
    },
    productUsbType: {
        type: String,
        required: true
    },
    productOTG: {
        type: String,
        required: true
    },
    productBattery: {
        type: Number,
        required: true
    },
    productWiredCharger: {
        type: Number,
        required: true
    },
    productWirelessCharger: {
        type: String,
        required: true
    },
    productFingerPrint: {
        type: String,
        required: true
    },
    productPortJack: {
        type: String,
        required: true
    },
    productLoudSpeakers: {
        type: String,
        required: true
    },
    productDualSpeakers: {
        type: String,
        required: true
    },
    productStereoSpeakers: {
        type: String,
        required: true
    },
    productRange: {
        type: String,
        required: true
    },
    productAvailableDate: {
        type: Number,
        required: true
    },
    productStock: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("mobile-products", MobileProductSchema);