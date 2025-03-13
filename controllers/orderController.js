const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncError = require("./../utilities/catchAsyncError");
const AppError = require("./../utilities/appError");
const user = require("./../models/userModel");
const products = require("./../models/productModel");

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { products, totalPrice, deliveryAddress } = req.body;

  if (!products || products.length === 0)
    next(new AppError("No products in order", 400));

  const order = await Order.create({
    user: req.user.id,
    products,
    totalPrice,
    deliveryAddress,
  });

  res.status(201).json({ status: "success", success: true, order });
});

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price");
  res.status(200).json({ status: "success", success: true, orders });
});

exports.getOrderById = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("products.product", "name price");

  if (!order) next(new AppError());
  res.status(200).json({ status: "success", success: true, order });
});

exports.updateOrderStatus = catchAsyncError(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) next(new AppError("Order not found", 404));
  order.status = status;
  await order.save();
  res.status(200).json({
    status: "success",
    success: true,
    message: "Order status updated",
    order,
  });
});

exports.deleteOrder = catchAsyncError(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) next(new AppError("Order not found", 404));
  res
    .status(200)
    .json({ status: "success", success: true, message: "Order deleted" });
});
