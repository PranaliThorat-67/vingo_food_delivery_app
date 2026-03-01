import uploadOnCloudinary from './../utils/cloudinary.js';
import Shop from '../models/shop.model.js';

export const createEditShop = async (req, res) => {
    try {
        const {name, city, state, address} = req.body;
        let image;
        if(req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        let shop = await Shop.findById(req._shopId);
        if(!shop) {
            const shop = await Shop.create({
            name, city, state, address, image, owner: req.userId
        })
        } else {
            shop = await Shop.findByIdAndUpdate(req._shopId, {
                name, city, state, address, image, owner: req.userId
            }, {new: true})
        }
        
        await shop.populate("owner");
        return res.status(201).json(shop);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `create shop error ${error.message}`});
    }

}

export const getShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({owner: req.userId}).populate("owner items");
        if (!shop) {
            return res.status(404).json({message: "Shop not found"});
        }
        return res.status(200).json(shop);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "get shop error"});
    } 

}


