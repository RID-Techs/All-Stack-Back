const MobileProducts = require("../Models/mobileProducts");
const fs = require("fs");
const path = require("path");

const addProduct = async(req, res) => {
    try {
    const { 
        productName,
        productRam,
        productRom,
        productScreenType,
        productDisplayResolution,
        productMainCamera,
        productFrontCamera,
        productDualSim,
        productEsim,
        productMermorySlot,
        productUsbType,
        productOTG,
        productBattery,
        productWiredCharger,
        productWirelessCharger,
        productFingerPrint,
        productPortJack,
        productLoudSpeakers,
        productDualSpeakers,
        productStereoSpeakers,
        productRange,
        productAvailableDate,
        productStock,
        productPrice
     } = req.body;

     if(!productName || !productRam || !productRam || !productRom || !productScreenType || !productDisplayResolution || !productMainCamera || !productFrontCamera || !productDualSim || !productEsim || !productMermorySlot || !productUsbType || !productOTG || !productBattery || !productWiredCharger || !productWirelessCharger || !productFingerPrint || !productPortJack || !productLoudSpeakers || !productDualSpeakers || !productStereoSpeakers || !productRange || !productAvailableDate || !productStock || !productPrice) {
        return res.status(400).json({errMsg: "All field are required !"})
     }

        if(!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const existingProduct = await MobileProducts.findOne({productName});

        if(existingProduct) {
            console.log("Product already exists");
            
            return res.status(400).json({ errMsg: 'Product already exists' });
        }

        const AddNewProduct = new MobileProducts({
            productName,
            productRam,
            productRom,
            productScreenType,
            productDisplayResolution,
            productMainCamera,
            productFrontCamera,
            productDualSim,
            productEsim,
            productMermorySlot,
            productUsbType,
            productOTG,
            productBattery,
            productWiredCharger,
            productWirelessCharger,
            productFingerPrint,
            productPortJack,
            productLoudSpeakers,
            productDualSpeakers,
            productStereoSpeakers,
            productRange,
            productAvailableDate,
            productStock,
            productPrice,
            productPicture : `${req.protocol}://${req.get('host')}/Images/${req.file.filename}`
        });
        await AddNewProduct.save();
        return res.status(201).json({msg: 'Product saved successfully'});
        
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllPhones = async (req, res) => {
    try {
        const AllPhones  = await MobileProducts.find();
        if(!AllPhones.length) {
            return res.status(404).json({msg: 'No phone found'});
        }
        return res.status(200).json({FindAllItems: AllPhones});
    } catch (error) {
        console.log("Error getting All Phones", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPhoneItemsByQuery = async (req, res) => {
  try {
    const { phoneRange } = req.query;
    const FilterByquery = await MobileProducts.find({productRange: phoneRange});
    if(!FilterByquery) return res.status(404).json({msg: 'Phone not found'});
    return res.status(200).json({FoundByQuery: FilterByquery});
  } catch (error) {
    console.log("Error getting Phone items by query", error);
    return res.status(500).json({ error: 'Internal Server'})
  }
}

const getPhoneById = async(req, res) => {
    try {
        const getId = req.params.id
        const RetrieveIdPhone = await MobileProducts.findById(getId);
        if(!RetrieveIdPhone) return res.status(404).json({msg: "Phone not found"})
        return res.status(200).json({ PhoneId : RetrieveIdPhone})
    } catch (error) {
        console.log("Error getting the Phone with the Id", error);
        return res.status(500).json({ error: "Internal Server" });
    }
}
const updatePhoneById = async(req, res) => {
    try {
        const {productPicture, ...body} = req.body;
        const getId = req.params.id
        const RetrieveIdPhone = await MobileProducts.findById(getId);
        if(!RetrieveIdPhone) return res.status(404).json({msg: "Phone not found"});

        if(req.file && RetrieveIdPhone.productPicture) {
            const oldImgPath = path.join(__dirname, "../Images", path.basename(RetrieveIdPhone.productPicture))
            if(fs.existsSync(oldImgPath)) {
                fs.unlinkSync(oldImgPath)
            }
        }
            if(Object.keys(body).length > 0){
                Object.assign(RetrieveIdPhone, body);
            }
            if(req.file){
                RetrieveIdPhone.productPicture = `${req.protocol}://${req.get('host')}/Images/${req.file.filename}`
            }
            await RetrieveIdPhone.save();
        return res.status(200).json({msg: "Computer added successfully !"})
    } catch (error) {
        console.log("Error getting the Phone with the Id", error);
        return res.status(500).json({ error: "Internal Server" });
    }
}

const DeleteById = async(req, res) => {
    try {
        const getId = req.params.id
        const RetrieveIdPhone = await MobileProducts.findById(getId);
        if(!RetrieveIdPhone) return res.status(404).json({msg: "Phone not found"});
        if(RetrieveIdPhone.productPicture) {
            const ImgPath = path.join(__dirname, "../Images", path.basename(RetrieveIdPhone.productPicture))
            if(fs.existsSync(ImgPath)) {
                fs.unlinkSync(ImgPath)
            }
        }
        await RetrieveIdPhone.deleteOne();
        res.status(200).json({msg: "Item Deleted successfully !"})
    } catch (error) {
        console.log("Error Deleting Item :", error);
        return res.status(500).json({msg : "Internal error"})
    }
}

module.exports = {addProduct, getAllPhones, getPhoneItemsByQuery, getPhoneById, updatePhoneById, DeleteById}