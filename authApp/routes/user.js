const express = require('express')
const router = express.Router()
const { signUp, login } = require('../controller/auth');
const { auth, isStudent, isAdmin } = require('../middleware/auth')

router.post('/signup', signUp);
router.post('/login', login);


//projected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        sucess: true,
        message: "Welcome to the Protected route for Student"
    });
})       //router.Method(path,midleware1,middleware2,... ,callbackfunction/handler function)

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Admin"
    })
})
module.exports = router;