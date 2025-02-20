const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const DATABASE =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9";
mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connection is successful"))
  .catch((err) => {
    console.error("Database Connection error", err);
  });
const port = process.env.PORT || 3000;
const server = app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
