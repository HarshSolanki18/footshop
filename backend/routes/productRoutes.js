import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

//fetch all products
// GET /api/products
// public
router.route("/").get(getProducts);

//fetch single product
// GET /api/products/:id
// public
router.route("/:id").get(getProductById);

export default router;
