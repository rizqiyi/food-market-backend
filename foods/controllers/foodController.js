const FoodSchema = require("../models/foodModel");
const UserSchema = require("../../users/models/userModel");

//@desc     GET all foods
//@routes   GET
//@access   Private
exports.getFoods = async (req, res) => {
  try {
    const foods = await FoodSchema.find();

    return res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc     Create food
//@routes   POST
//@access   Private
exports.postFood = async (req, res) => {
  try {
    const { foodName, price, description } = req.body;
    const path = req.file.path;

    const foods = await FoodSchema.create({
      foodName,
      price,
      description,
      photoPath: path,
    });

    return res.status(201).json({
      success: true,
      data: foods,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
