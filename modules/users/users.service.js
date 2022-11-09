const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./users.model");
const { JWT_SECRET } = require("../../config/credentials");

const formatTokenPayload = ({ username, id, created_at }) => ({
  username,
  id,
  created_at,
});

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });

  // create salt & hash
  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      try {
        const user = await newUser.save();
        jwt.sign(
          formatTokenPayload(user),
          JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              message: "Registration Success",
            });
          }
        ); //end jwt sign
      } catch (message) {
        res.status(400).json({
          message,
        });
      }
    }); //end hash
  }); //end salt
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res.status(422).json([
      {
        message: "Username does not exists!",
      },
    ]);

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch)
      return res.status(422).json([
        {
          message: "Invalid credentials",
        },
      ]);

    jwt.sign(
      formatTokenPayload(user),
      JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          message: "Login Success",
        });
      }
    ); //jwt sign
  });
};

module.exports = {
  register,
  login,
};
