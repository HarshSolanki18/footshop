import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//fetch all products
// GET /api/products
// public

export const getProducts=asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
})

//fetch single product
// GET /api/products/:id
// public
export const getProductById=asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})
