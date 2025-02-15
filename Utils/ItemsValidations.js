const ProductsValidations = {
    productName: {
        isString: {
            errorMessage: "Product name must be a string"
        },
        notEmpty: {
            errorMessage: "Product name cannot be empty"
        }
    },
    productPicture: {
        isString: {
            errorMessage: "Product picture must be a string"
        },
        notEmpty: {
            errorMessage: "Product picture cannot be empty"
        }
    },
    productRam: {
        notEmpty: {
            errorMessage: "Product RAM cannot be empty"
        }
    },
    productRom: {
        notEmpty: {
            errorMessage: "Product ROM cannot be empty"
        }
    },
    productScreenType: {
        isString: {
            errorMessage: "Product screen type must be a string"
        },
        notEmpty: {
            errorMessage: "Product screen type cannot be empty"
        }
    },
    productDisplayResolution: {
        isString: {
            errorMessage: "Product display resolution must be a string"
        },
        notEmpty: {
            errorMessage: "Product display resolution cannot be empty"
        }
    },
    productMainCamera: {
        isInt: {
            errorMessage: "Product main camera must be a number"
        },
        notEmpty: {
            errorMessage: "Product main camera cannot be empty"
        }
    },
    productFrontCamera: {
        isInt: {
            errorMessage: "Product front camera must be a number"
        },
        notEmpty: {
            errorMessage: "Product front camera cannot be empty"
        }
    },
    productDualSim: {
        notEmpty: {
            errorMessage: "Product dual SIM cannot be empty"
        }
    },
    productMermorySlot: {
        notEmpty: {
            errorMessage: "Product memory slot cannot be empty"
        }
    },
    productUsbType: {
        isString: {
            errorMessage: "Product USB type must be a string"
        },
        notEmpty: {
            errorMessage: "Product USB type cannot be empty"
        }
    },
    productOTG: {
        notEmpty: {
            errorMessage: "Product OTG cannot be empty"
        }
    },
    productBattery: {
        isInt: {
            errorMessage: "Product battery must be a number"
        },
        notEmpty: {
            errorMessage: "Product battery cannot be empty"
        }
    },
    productWiredCharger: {
        isInt: {
            errorMessage: "Product wired charger must be a number"
        },
        notEmpty: {
            errorMessage: "Product wired charger cannot be empty"
        }
    },
    productWirelessCharger: {
        notEmpty: {
            errorMessage: "Product wireless charger cannot be empty"
        }
    },
    productFingerPrint: {
        notEmpty: {
            errorMessage: "Product fingerprint cannot be empty"
        }
    },
    productPortJack: {
        notEmpty: {
            errorMessage: "Product port Jack cannot be empty"
        }
    },
    productLoudSpeakers: {
        notEmpty: {
            errorMessage: "Product loudspeakers cannot be empty"
        }
    },
    productDualSpeakers: {
        notEmpty: {
            errorMessage: "Product dual speakers cannot be empty"
        }
    },
    productStereoSpeakers: {
        notEmpty: {
            errorMessage: "Product stereo speakers cannot be empty"
        }
    },
    productRange: {
        isString: {
            errorMessage: "Product range must be a string"
        },
        notEmpty: {
            errorMessage: "Product range cannot be empty"
        }
    },
    productAvailableDate: {
        isInt: {
            errorMessage: "Product available date must be a number"
        },
        notEmpty: {
            errorMessage: "Product available date cannot be empty"
        }
    },
    productPrice: {
        isInt: {
            errorMessage: "Product price must be a number"
        },
        notEmpty: {
            errorMessage: "Product price cannot be empty"
        }
    }
}

module.exports = ProductsValidations;