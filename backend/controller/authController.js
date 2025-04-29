const internalUserDB = require("../models/InternalUsersDB.js");
const siteUsersDB = require("../models/siteUsersDB.js");

const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { id, password } = req.body;
  const refreshToken = "";
  role = "ADMIN";
  try {
    const newAdmin = new internalUserDB({ id, password, role, refreshToken });
    await newAdmin.save();

    console.log(newAdmin);
  } catch (error) {
    console.log(error);
  }
  // res.send("GET Request Called")
};

module.exports.logIn = async (req, res) => {
  console.log(req.body, "login controller");
  const { id, password } = req.body;

  const foundUser = internalUserDB
    .findOne({ id, password })
    .then((saved) => {
      console.log(saved);
      if (saved) {
        //create Jwt
        const accessToken = jwt.sign(
          { username: saved.id, role: saved.role,_id:saved._id },

          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1200s" }
        );
        const refreshToken = jwt.sign(
          { username: saved.id, role: saved.role ,_id:saved._id},
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        try {
          internalUserDB
            .findOneAndUpdate(
              { id: id },
              { refreshToken: refreshToken },
              { returnDocument: "after" }
            )
            .then((saved) => {
              res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                path: "/",
              });
              res.json({ accessToken });
            })
            .catch((e) => {
              console.log(e);
            });
        } catch (e) {
          console.log("line 157", e);
        }
      } else res.send(false);
    })
    .catch((err) => {
      console.error("line 166", err);
      res.send(false);
    });
};

module.exports.userLogIn = async (req, res) => {
    console.log(req.body, "user login controller");
    const { id, password } = req.body;

    try {
        // 1. Find the user by email (ID)
        const foundUser = await siteUsersDB.findOne({ email: id });

        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2. Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        console.log('passwordMatch',passwordMatch)

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Generate tokens (Access and Refresh)
        const accessToken = jwt.sign(
            {
                _id: foundUser._id,
                username: foundUser.email,
                role: foundUser.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

       

        const refreshToken = jwt.sign(
            { _id: foundUser._id, email: foundUser.email, role: foundUser.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        

        // 4. Update the user's refresh token in the database
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // 5.  Send the refresh token as a cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });

        // 6. Send the access token and user data in the response
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
            },
            accessToken,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports.addEmployee = async (req, res) => {
  try {
    const { userId, password, role } = req.body;
    console.log(req.body);

    // Validate inputs
    if (!userId || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    //add  a function later that verifies role, preferably use jwt

    // Create new user
    const newUser = new internalUserDB({
      id: userId,
      password,
      role: role,
      refreshToken: "", // Empty string for refreshToken
    });

    // Save user to the database
    await newUser.save();
    console.log("User added successfully.");
    res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getAllEmployees = async (req, res) => {
  try {
    // Fetch all users with the role of 'EMPLOYEE'
    const employees = await internalUserDB
      .find({ role: "EMPLOYEE" })
      .select("-password -refreshToken");

    // Check if employees exist
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found." });
    }

    res.status(201).json(employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.deleteEmployee = async (req, res) => {
  const _id = req.body.userId;

  try {
    // Find and delete employee by ID
    const result = await internalUserDB.deleteOne({ _id });
    console.log(result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.changeEmpPassword = async (req, res) => {
  const { _id, password } = req.body; // Expecting employee ID and new password in the request body
  console.log(req.body);

  if (!_id || !password) {
    console.log("not found");
    return res
      .status(400)
      .json({ message: "Employee ID and new password are required" });
  }

  try {
    console.log(req.body);

    // Update the password in the database
    const result = await internalUserDB.updateOne(
      { _id },
      { $set: { password } }
    );
    console.log(result);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports.userSignup = async (req, res) => {
  console.log("reached user signup", req.body);

  const { firstName, lastName, email, password } = req.body;
  const role = "USER";

  try {
    // 1. Check if the user already exists
    const existingUser = await siteUsersDB.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already taken." });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the new user
    const newSiteuser = new siteUsersDB({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newSiteuser.save();

    // 4. Generate tokens          { username: saved.id, role: saved.role },


    const accessToken = jwt.sign(
      {        
        userId: newSiteuser._id,
        username: newSiteuser.email,
        role: newSiteuser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        _id: newSiteuser._id,
        email: newSiteuser.email,
        role: newSiteuser.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // 5.  Update the user with the refresh token.
    newSiteuser.refreshToken = refreshToken;
    await newSiteuser.save();

    // 6. Send the response

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });
    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email to verify your account.",
      user: {
        _id: newSiteuser._id,
        firstName: newSiteuser.firstName,
        lastName: newSiteuser.lastName,
        email: newSiteuser.email,
        role: newSiteuser.role,
      },
      accessToken: accessToken,
    });
    console.log("newSiteuser created", newSiteuser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error registering user.",
        error: error.message,
      });
  }
};


module.exports.logout = async (req, res) => {
    console.log('reached logout');

    const token = req.cookies.jwt;
    console.log('token', token);
    const decodedToken = jwt.decode(token)
    console.log('decodedToken', decodedToken);
    console.log('decoded._id ', decodedToken._id);
    const id=decodedToken._id
    const blankstring = '';


    if(decodedToken.role=='ADMIN' || decodedToken.role=='EMP' ){
    internalUserDB.findOneAndUpdate({ _id: id }, { refreshToken: blankstring }, { returnDocument: 'after' })
        .then((saved) => {
            console.log('updated user refresh token/logout', saved)
            res.send('logged out')
        })
        .catch((e) => { console.log(e) })
    }
    else{
        console.log('user block')
        siteUsersDB.findOneAndUpdate({ _id: id }, { refreshToken: blankstring }, { returnDocument: 'after' })
        .then((saved) => {
            console.log('updated user refresh token/logout', saved)
            res.send('logged out')
        })
        .catch((e) => { console.log(e) })

    }



}
