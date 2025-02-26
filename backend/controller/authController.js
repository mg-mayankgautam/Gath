const userDB = require("../models/UsersDB.js")
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {

    console.log(req.body)
    const { id, password } = req.body;
    const refreshToken = '';
    role = 'ADMIN';
    try {

        const newAdmin = new userDB({ id, password, role, refreshToken });
        await newAdmin.save();

        console.log(newAdmin)

    } catch (error) {
        console.log(error)
    }
    // res.send("GET Request Called")

}



module.exports.logIn = async (req, res) => {

    console.log(req.body, 'login controller')
    const { id, password } = req.body;

    const foundUser = userDB.findOne({ id, password })
        .then((saved) => {

            if (saved) {
                //create Jwt
                const accessToken = jwt.sign(
                    { "username": saved.id, "role": saved.role },

                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1200s' } 
                );
                const refreshToken = jwt.sign(
                    { "username": saved.id, "role": saved.role },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                try {
                    userDB.findOneAndUpdate({ id: id }, { refreshToken: refreshToken }, { returnDocument: 'after' })
                        .then((saved) => {

                            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                            res.json({ accessToken });
                        })
                        .catch((e) => { console.log(e) })
                }  
                catch (e) { console.log('line 157', e) }

            }
            else res.send(false);
        })
        .catch(err => {
            console.error('line 166', err)
            res.send(false)
        })
}


module.exports.addEmployee = async (req, res) => {

    try {
        const { userId, password, role } = req.body;
        console.log(req.body)

        // Validate inputs
        if (!userId || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        //add  a function later that verifies role, preferably use jwt

        // Create new user
        const newUser = new userDB({
            id: userId,
            password,
            role: role,
            refreshToken: "", // Empty string for refreshToken
        });

        // Save user to the database
        await newUser.save();
        console.log("User added successfully.")
        res.status(201).json({ message: "User added successfully." });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


module.exports.getAllEmployees = async (req, res) => {
    try {
        // Fetch all users with the role of 'EMPLOYEE'
        const employees = await userDB.find({ role: "EMPLOYEE" }).select("-password -refreshToken");

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

    const _id = req.body.userId
    
    try {

        // Find and delete employee by ID
        const result = await userDB.deleteOne({ _id });
        console.log(result)
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
    console.log(req.body)

    if (!_id || !password) {
        console.log("not found")
        return res.status(400).json({ message: "Employee ID and new password are required" });
    }

    try {
        console.log(req.body)

        // Update the password in the database
        const result = await userDB.updateOne(
            { _id },
            { $set: { password } }
        );
        console.log(result)

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
