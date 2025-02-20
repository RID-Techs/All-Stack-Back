const supabase = require("../Config/Supa");
const MobileProducts = require("../Models/mobileProducts");
// const fs = require("fs");
// const path = require("path");

const MIME_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
}
const generateFileName = (originalName, mimetype) => {
  const name = originalName.replace(/\s+/g, "_").replace(/\.[^/.]+$/, "");
  const extension = MIME_TYPES[mimetype];
  return `${name}_${Date.now()}.${extension}`;
};

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

     if(!productName || !productRam || !productRom || !productScreenType || !productDisplayResolution || !productMainCamera || !productFrontCamera || !productDualSim || !productEsim || !productMermorySlot || !productUsbType || !productOTG || !productBattery || !productWiredCharger || !productWirelessCharger || !productFingerPrint || !productPortJack || !productLoudSpeakers || !productDualSpeakers || !productStereoSpeakers || !productRange || !productAvailableDate || !productStock || !productPrice) {
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

        const filename = generateFileName(req.file.originalname, req.file.mimetype);

        const {data, error} = await supabase.storage
            .from("external-files")
            .upload(filename, req.file.buffer, {contentType: req.file.mimetype})

            if (error) throw error;

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
            productPicture : `${process.env.SUPABASE_URL}/storage/v1/object/public/external-files/${filename}`
        });
        await AddNewProduct.save();
        return res.status(201).json({msg: 'Phone added successfully'});
        
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
          if (!req.file) {
                console.log("File no dey ooh");
                RetrieveIdPhone.productPicture = "";
            }

        let imageUrl = RetrieveIdPhone.productPicture;

        if(req.file && RetrieveIdPhone.productPicture) {
            console.log("File still dey amhForLoc :", req.file);
            console.log("File still dey amhOnline :", RetrieveIdPhone.productPicture);

            const oldFileName = RetrieveIdPhone.productPicture.split("/").pop();

      if (oldFileName) {
        const { error: deleteError } = await supabase
          .storage
          .from("external-files")
          .remove([oldFileName]);
        if (deleteError) console.error("Image delete error:", deleteError.message);
      }
            
        const filename = generateFileName(req.file.originalname, req.file.mimetype);

            const {data, error} = await supabase.storage
            .from("external-files")
            .upload(filename, req.file.buffer, {contentType: req.file.mimetype})
            if (error) throw error;

            imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/external-files/${filename}`;
        }

            if(Object.keys(body).length > 0){
                Object.assign(RetrieveIdPhone, body);
            }

            if(req.file){
                RetrieveIdPhone.productPicture = imageUrl;
            }
            await RetrieveIdPhone.save();
        return res.status(200).json({msg: "Phone updated successfully !"})
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
            const FileToRemove = RetrieveIdPhone.productPicture.split("/").pop();

      if (FileToRemove) {
        const { error: deleteError } = await supabase
          .storage
          .from("external-files")
          .remove([FileToRemove]);
        if (deleteError) console.error("Image delete error:", deleteError.message);
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