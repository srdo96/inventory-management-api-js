const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema, Types } = mongoose.Schema;

// middleware
app.use(express.json());
app.use(cors());

// schema design
const productSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3"],
      maxLength: [15, "Name is too large"],
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: [1, "Price can be less then zero"],
    },
    unit: {
      type: String,
      require: true,
      enum: {
        value: ["kg", "litter", "pcs"],
        message: "Unite value can't be {value}",
      },
    },
    quantity: {
      type: Number,
      require: true,
      min: [0, "Quantity can't be less then zero"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) return true;
          return false;
        },
        message: "Quantity must be an integer",
      },
    },
    status: {
      type: String,
      enum: {
        value: ["stock", "stock out", "discontinued"],
        message: "Status can't be {value}",
      },
      supplier: {
        type: Types.ObjectId,
        ref: "Supplier",
      },
      catagories: [
        {
          name: {
            type: String,
            require: true,
          },
          _id: Types.ObjectId,
        },
      ],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
