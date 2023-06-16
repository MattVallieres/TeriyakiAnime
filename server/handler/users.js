const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

require("dotenv").config();
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "TeriyakiDatabase"
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define the user schema using Mongoose
const userSchema = mongoose.model('Users', new Schema({
    username: String,
    password: String,
}));

// Define the function to create a user
const createUser = async (req, res) => {
    try {
        // Extract the username and password from the request body
        const { username, password } = req.body;

        // Check if the password meets the requirements
        // Count the number of letters (a-zA-Z) and numbers (\d) in the password
        const hasEnoughLetters = password.match(/[a-zA-Z]/g)?.length >= 6;
        const hasEnoughNumbers = password.match(/\d/g)?.length >= 2;

        // If the password doesn't meet the requirements, send an error response
        if (!hasEnoughLetters || !hasEnoughNumbers) {
            return res.status(400).json({
                error: "Password must contain at least 6 letters and 2 numbers",
            });
        }

        // Check if the username already exists in the database
        const existingUser = await userSchema.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        // Hash the password using bcrypt with a cost factor of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the username and hashed password
        const user = new userSchema({ username, password: hashedPassword });

        // Save the user to the database
        await user.save();

        // Log a success message and send a success response
        console.log("Account successfully created!");
        res.sendStatus(201);
    } catch (error) {
        // If an error occurs during the process, log the error and send an internal server error response
        console.error("Error creating user:", error);
        res.sendStatus(500);
    }
};

module.exports = {
    createUser,
};