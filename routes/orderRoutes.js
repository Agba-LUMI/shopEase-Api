const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("./../controllers/orderController");
const authController = require("./../controllers/authControllers");

const router = express.Router();
router.use(authController.protect);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.use(authController.restrictTo("admin"));
router.get("/", getAllOrders);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
