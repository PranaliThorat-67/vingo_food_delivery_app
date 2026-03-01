import express from 'express';
import { createItem, editItem } from '../controllers/item.controllers.js';
import isAuth from '../middlewares/isAuth.js';
import upload  from '../middlewares/multer.js';

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), createItem);
itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;