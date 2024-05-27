const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
const db = process.env.connection_str;

// Connect to MongoDB using the connection string
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((e) => {
    console.log(`No connection: ${e}`);
  });

// mongodb://localhost:27017
