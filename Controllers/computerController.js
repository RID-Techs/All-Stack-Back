const supabase = require("../Config/Supa");
const ComputerModel = require("../Models/computerProducts");
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

const addComputerFunc = async (req, res) => {
  try {
    const { 
      ComputerName,
      ComputerRam,
      ComputerRom,
      ComputerDiskType,
      ComputerScreenInch,
      ComputerProcessor,
      ComputerProcessorFrequency,
      ComputerHeart,
      ComputerIntegratedGpu,
      ComputerDedicatedGpu,
      ComputerKeyboard,
      ComputerKeyboardLight,
      ComputerSimCard,
      ComputerOs,
      ComputerBattery,
      ComputerTouchScreen,
      ComputerUSBNumber,
      ComputerRJ45,
      ComputerHDMI,
      ComputerVGA,
      ComputerType_C,
      ComputerPortJack,
      ComputerType,
      ComputerDesignedFor,
      ComputerAvailableYear,
      ComputerStock,
      ComputerPrice
     } = req.body;

     if(!ComputerName || !ComputerRam || !ComputerRom || !ComputerDiskType || !ComputerScreenInch || !ComputerProcessor || !ComputerProcessorFrequency || !ComputerHeart || !ComputerIntegratedGpu || !ComputerDedicatedGpu || !ComputerKeyboard || !ComputerKeyboardLight || !ComputerSimCard || !ComputerOs || !ComputerBattery, !ComputerTouchScreen || !ComputerUSBNumber || !ComputerRJ45 || !ComputerHDMI || !ComputerVGA ||!ComputerType_C || !ComputerPortJack || !ComputerType || !ComputerDesignedFor || !ComputerAvailableYear || !ComputerStock || !ComputerPrice) {
        return res.status(400).json({errMsg: "All fields are required !"})
      }

      if(!req.file) {
        return res.status(400).json({errMsg: "File not found !"})
      }

        const existingProduct = await ComputerModel.findOne({ComputerName});
      
              if(existingProduct) {
                  console.log("Computer already exists");
                  return res.status(400).json({ errMsg: 'Computer already exists' });
              }

                const filename = generateFileName(req.file.originalname, req.file.mimetype);

        const {data, error} = await supabase.storage
            .from("external-files")
            .upload(filename, req.file.buffer, {contentType: req.file.mimetype})

            if (error) throw error;

      const addComputer = new ComputerModel({
        ComputerName,
      ComputerRam,
      ComputerRom,
      ComputerDiskType,
      ComputerScreenInch,
      ComputerProcessor,
      ComputerProcessorFrequency,
      ComputerHeart,
      ComputerIntegratedGpu,
      ComputerDedicatedGpu,
      ComputerKeyboard,
      ComputerKeyboardLight,
      ComputerSimCard,
      ComputerOs,
      ComputerBattery,
      ComputerTouchScreen,
      ComputerUSBNumber,
      ComputerRJ45,
      ComputerHDMI,
      ComputerVGA,
      ComputerType_C,
      ComputerPortJack,
      ComputerType,
      ComputerDesignedFor,
      ComputerAvailableYear,
      ComputerStock,
      ComputerPrice,
      ComputerPicture: `${process.env.SUPABASE_URL}/storage/v1/object/public/external-files/${filename}`
      })
      await addComputer.save();
      return res.status(201).json({msg: "Computer added successfully !"})

  } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getComputerItemsByQuery = async (req, res) => {
  try {
    const { computerField } = req.query;
    if(computerField === "laptop" || computerField === "desktop") {
      const FilterByquery = await ComputerModel.find({ComputerType: computerField});
      if(!FilterByquery) return res.status(404).json({msg: 'Computer not found'});
      return res.status(200).json({FoundByQuery: FilterByquery});
    } else {
      const FilterByquery = await ComputerModel.find({ComputerDesignedFor: computerField});
      if(!FilterByquery) return res.status(404).json({msg: 'Computer not found'});
      return res.status(200).json({FoundByQuery: FilterByquery});
    }
  } catch (error) {
    console.log("Error getting computer items by query", error);
    return res.status(500).json({ error: 'Internal Server'})
  }
}
const getAllComputerItems = async (req, res) => {
  try {
    const FindAllItems = await ComputerModel.find();
    if(!FindAllItems) return res.status(404).json({msg: 'No Computer found'});
    return res.status(200).json({FindAllItems: FindAllItems});
  } catch (error) {
    console.log("Error getting computer items by query", error);
    return res.status(500).json({ error: 'Internal Server'})
  }
}

const getComputerById = async(req, res) => {
    try {
        const getId = req.params.id
        const RetrieveIdComputer = await ComputerModel.findById(getId);
        if(!RetrieveIdComputer) return res.status(404).json({msg: "Computer not found"})
        return res.status(200).json({ ComputerId : RetrieveIdComputer})
    } catch (error) {
        console.log("Error getting the Computer with the Id", error);
        return res.status(500).json({ error: "Internal Server" });
    }
}
const updateComputerById = async(req, res) => {
    try {
        const {ComputerPicture, ...body} = req.body;
        const getId = req.params.id
        const RetrieveIdComputer = await ComputerModel.findById(getId);
        if(!RetrieveIdComputer) return res.status(404).json({msg: "Compuetr not found"});

         if (!req.file) {
                console.log("File no dey ooh");
                RetrieveIdComputer.ComputerPicture = "";
            }

            let imageUrl = RetrieveIdComputer.ComputerPicture;

        if(req.file && RetrieveIdComputer.ComputerPicture) {
              console.log("File still dey amhForLoc :", req.file);
                       console.log("File still dey amhOnline :", RetrieveIdComputer.ComputerPicture);
                       const oldFileName = RetrieveIdComputer.ComputerPicture.split("/").pop();

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
                Object.assign(RetrieveIdComputer, body);
            }
            if(req.file){
                RetrieveIdComputer.ComputerPicture = imageUrl;
            }
            await RetrieveIdComputer.save();
        return res.status(200).json({ msg: "Computer added successfully !" })
    } catch (error) {
        console.log("Error getting the Computer with the Id", error);
        return res.status(500).json({ error: "Internal Server" });
    }
}

const DeleteCompById = async(req, res) => {
    try {
        const getId = req.params.id
        const RetrieveIdComputer = await ComputerModel.findById(getId);
        if(!RetrieveIdComputer) return res.status(404).json({msg: "Computer not found"});
        if(RetrieveIdComputer.ComputerPicture) {
          const FileToRemove = RetrieveIdComputer.ComputerPicture.split("/").pop();

      if (FileToRemove) {
        const { error: deleteError } = await supabase
          .storage
          .from("external-files")
          .remove([FileToRemove]);
        if (deleteError) console.error("Image delete error:", deleteError.message);
      }
        }
        await RetrieveIdComputer.deleteOne();
        res.status(200).json({msg: "Item Deleted successfully !"})
    } catch (error) {
        console.log("Error Deleting Item :", error);
        return res.status(500).json({msg : "Internal error"})
    }
}

module.exports = {addComputerFunc, getAllComputerItems, getComputerItemsByQuery, getComputerById, updateComputerById, DeleteCompById}