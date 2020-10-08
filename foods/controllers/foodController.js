const FoodSchema = require("../models/foodModel");

//@desc     GET all foods
//@routes   GET
//@access   Public
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
