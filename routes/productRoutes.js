const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./../controllers/productController");
const authControllers = require("./../controllers/authControllers");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.use(authControllers.protect);
router.use(authControllers.restrictTo("admin"));
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
