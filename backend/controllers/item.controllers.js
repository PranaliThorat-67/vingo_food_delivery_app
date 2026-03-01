import shop from '../models/shop.model.js';
import Item from '../models/item.model.js';
import uploadOnCloudinary from './../utils/cloudinary.js';

export const createItem = async (req, res) => {
    try {
        const {name, category, foodType, price} = req.body;
        let image;
        if(req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }
        const shop = await Shop.findById(req._shopId);
        if(!shop) {
            return res.status(404).json({message: "Shop not found"});
        }
        const item = await Item.create ({
            name, category, foodType, price, image, shop: req._shopId
        })
        await item.populate("shop");
        return res.status(201).json(item);
    } catch (error) {        console.log(error);
        return res.status(500).json({message: `Create Item Error ${error.message}`
        })
    }
}


export const editItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const {name, category, foodType, price} = req.body;
        let image;
        if(req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category, foodType, price, image
        }, {new: true});

        if(!item) {
            return res.status(404).json({message: "Item not found"});
        }   

        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `Edit Item Error ${error.message}`});
    }       
}

