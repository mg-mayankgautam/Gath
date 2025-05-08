const adminDB = require("../models/InternalUsersDB.js");
const usersDB = require("../models/siteUsersDB.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.handleRefreshToken = async (req, res) => {
  console.log("reached refresh");
  const cookies = req.cookies;
  // console.log(cookies);

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const decodedToken = jwt.decode(refreshToken);
  // console.log('decodedToken',decodedToken.role)
  console.log(decodedToken);

  if (decodedToken.role == "ADMIN" || decodedToken.role == "EMPLOYEE") {
    const foundUser = adminDB
      .findOne({ refreshToken })
      .then((saved) => {
        if (saved) {
          console.log("user found in db", saved);
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
              console.log("decoded", decoded);
              if (err || saved.id !== decoded.username)
                return res.sendStatus(403);
              console.log(
                "saved username is same as decoded username",
                saved.id,
                decoded.username
              );
              const accessToken = jwt.sign(
                {
                  username: decoded.username,
                  role: decoded.role,
                  _id: decoded._id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "600s" }
              );

              res.json({ accessToken });
            }
          );

          console.log("breakpoint");
        } else res.send(false);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(403);
      });
  } else {
    console.log("user refresh");
    usersDB
      .findOne({ refreshToken })
      .then((saved) => {
        if (saved) {
          const subscribed = saved.subscription.subscriptionStatus;

          console.log("user found in db", saved);
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
              console.log(decoded);
              if (err || saved.email !== decoded.email)
                return res.sendStatus(403);
              // console.log('saved username is same as decoded username')
              const accessToken = jwt.sign(
                {
                  username: decoded.email,
                   firstName:decoded.firstName,
                  role: decoded.role,
                  _id: decoded._id,
                  subscription: subscribed,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "600s" }
              );

              res.json({ accessToken });
            }
          );

          console.log("breakpoint 1");
        } else res.send(false);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(403);
      });
  }
};
