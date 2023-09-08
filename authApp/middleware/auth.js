//auth ,isStudent,isAdmin middleware

const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.auth = (req, res, next) => {   //next => it will call nextMiddleware
    try {
        //extract JWT token
        //there is other methods also we will do it future class

        console.log(req.cookies.token);
        // console.log(req.header("Authorization"));
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");//we can  also fetch from cookie and header we will learn 

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Bhai sahab token nhi hai"
            })
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this?
            req.user = payload;
        } catch (error) {
            return res.json({
                message: "token is invalid",
            });
        }
        next();
    } catch (error) {

    }

}

exports.isStudent = (req, res, next) => {
    try {

        if (req.user.role !== "Student") {
            return res.status(401).json({
                sucess: false,
                message: "you are trying to interact projected page"
            });

        }
        next();
    } catch (error) {
        res.json({
            message: "Server side erro"
        });
    }
}
exports.isAdmin = (req, res, next) => {
    try {

        if (req.user.role != "Admin") {
            return res.status(401).json({
                success: false,
                message: "you are trying to interact projected page"
            });

        }
        next();
    } catch (error) {
        res.json({
            message: "Server side error"
        });
    }
}