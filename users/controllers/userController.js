const UserSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmpty = !username || !email || !password;

    if (isEmpty)
      return res.status(400).send({ message: "Please enter all fields" });

    await UserSchema.findOne({ email }).then((user) => {
      if (user) return res.status(400).send({ message: "User already exists" });

      const newUser = new UserSchema({
        username,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save().then((user) =>
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
            )
          );
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
