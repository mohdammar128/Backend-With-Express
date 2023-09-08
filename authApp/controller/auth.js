const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signUp = async (req, res) => {
    try {
        console.log("aagaye bhai");
        const { name, email, password, role } = req.body;
        // if user already exist
        const verify = await User.findOne({ email: email });
        if (verify) {
            return res.json({
                sucess: false,
                message: "User already exist",
            });
        }

        let hashPassword;
        try {
            hashPassword = await bcrypt.hashing(password, 10);
        } catch (err) {
            return res.status(500).json({
                sucess: false,
                message: "error in hashing password",
            });
        }
        console.log(hashPassword);
        const userData = new User({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        });
        const saveData = await userData.save();
        return res.status(200).json({
            message: "Successfully Signed up",
            data: saveData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error Please try again",
        });
    }
};

//handler for login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // user has not signed in
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please first SignUp",
            });
        }

        const payload = {
            email: user.email,
            password: user.password,
            role: user.role,
        };
        //validation of password

        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user["password"] = undefined;
            //two methods to do that
            // const userWithToken = Object.assign({}, user._doc, { token });s
            const userWithToken = { ...user._doc, token }


            //cookie
            const option = {
                expires: new Date(Date.now() + 30000),
                httpOnly: true,
            };

            //in response we passing cookie
            res.cookie("token", token, option).status(200).json({
                data: userWithToken,
                message: "Successfully login",
            });
        } else {
            return res.status(404).json({
                message: "Please enter corrrect password",
            });
        }
    } catch (err) {
        return res.json({
            message: "ServerSide error",
        });
    }
};

module.exports = { signUp, login };
