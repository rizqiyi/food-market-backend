const UserSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc     Login user
//@routes   POST
//@access   Public
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isEmpty = !username || !password;

    if (isEmpty)
      return res.status(400).json({ message: "Please enter all fields" });

    await UserSchema.findOne({ username }).then((user) => {
      if (!user)
        return res.status(400).json({ message: "User does not exist" });

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Invalid credentials" });

        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
            });
          }
        );
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
};

//@desc     GET User when login
//@routes   GET
//@access   Private
exports.getUser = async (req, res) => {
  await UserSchema.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};
