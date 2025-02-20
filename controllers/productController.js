const catchAsyncError = require("../utilities/catchAsyncError");
const ProductsModel = require("./../models/productModel");
const Product = require("./../models/productModel");
const AppError = require("./../utilities/appError");

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await ProductsModel.find();
  if (!products) next(new AppError("No Product(s) found", 404));
  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

exports.getProductById = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.findByIdAndDelete);
  if (!product) next(new AppError("New Product found", 404));
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) next(new AppError("Please supply the product details"));
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: {
      product,
    },
  });
});
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updateProduct) next(new AppError("Product not found", 404));
  res.status(200).json({
    status: "success",
    message: "Product updated",
    data: {
      updateProduct,
    },
  });
});
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) next(new AppError("Product not found", 404));
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});
