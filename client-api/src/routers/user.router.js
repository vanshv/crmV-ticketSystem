const express = require("express");
const {route, post} = require('./ticket.router');
const router = express.Router();
const {insertUser, getUserByEmail, getUserById, updatePassword} = require('../model/user/User.model');
const {hashPassword, comparePassword} = require('../helpers/bcrypt.helper');
const {createAccessJWT, createRefreshJWT} = require('../helpers/jwt.helper');
const {userAuthorization} = require('../middlewares/authorization.middleware');
const {setPasswordResetPin, getPinByEmail, deletePin} = require('../model/resetPin/ResetPin.model');
const {emailProcessor} = require('../helpers/email.helper');
const {resetPassReqValidation, updatePassValidation} = require('../middlewares/formValidation.middleware');
const { verify } = require("jsonwebtoken");
const { deleteJWT } = require("../helpers/redis.helper");

router.all('/', (req, res, next) => {
    // res.json({message: "hello from user router"});

    next();
});

//Get user profile router
router.get('/', userAuthorization, async (req, res) => {
    const _id = req.userId;
    const userProf = await getUserById(_id);
    console.log(userProf);
    res.json({user: userProf});
});

//Create new user router
router.post('/', async (req, res) => {
    const {name, company, address, phone, email, password} = req.body;

    try{
        const hashedPass = await hashPassword(password);
        const newUserObj = {
            name,
            company,
            address,
            phone,
            email,
            password: hashedPass,
        };

        const result = await insertUser(newUserObj);
        res.json({message: "new user created", result});
    } catch(error){
        console.log(error);
        res.json({statux: 'error', message: error.message});
    }
});

//User sign in router
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.json({status: "error", message: "Missing email or password"});
    }

    const user = await getUserByEmail(email);
    const passFromDb = user && user._id ? user.password : null;

    if(!passFromDb)
        return res.json({status: "error", message: "Invalid email or password"
    });

    const result = await comparePassword(password, passFromDb);

    if(!result){
        return res.json({staus: "error", message: "password doesn't match"});
    }

    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

    res.json({
        status: 'success',
        message: 'Login Successful',
        accessJWT,
        refreshJWT,
    });
});

router.post('/reset-password', resetPassReqValidation, async (req, res) => {
    const {email} = req.body;
    const user = await getUserByEmail(email);
    
    if(!user || !user._id){
        return res.json({
            status: "error",
            message:
            "If the email is in our database, the password reset pin will be sent shortly",
        });
    }

    const setPin = await setPasswordResetPin(email);
    await emailProcessor({
        email,
        pin: setPin.pin,
        type: "request-new-password",
    });

    return res.json({
        status: "success",
        message:
        "if the email is in our database, the password reset pin will be sent shortly",
    });
});

router.patch('/reset-password', updatePassValidation, async (req, res) => {
    const {email, pin, newPassword} = req.body;

    const getPin = await getPinByEmail(email, pin);
    console.log(getPin);
    if(!getPin || !getPin._id){
        return res.json({
            status: "error",
            message: "unable to update your password. Please try again later",
        });
    }

    const dbDate = getPin.addedAt;
    const expiresIn = 1;

    let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

    const today = new Date();

    if(today > expDate){
        return res.json({status: "error", message: "Invalid or expired pin"});
    }

    const hashedPass = await hashPassword(newPassword);
    const user = await updatePassword(email, hashedPass);

    if(!user._id){
        return res.json({
            status: "error",
            message: "unable to update your password. Plese try again later",
        });
    }

    await emailProcessor({email, type: 'update-password-success'});
    deletePin(email, pin);
    res.json({
        status: "success",
        message: "your password has been updated",
    });
});

// User logout and invalidate jwts
router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization } = req.headers;
    const _id = req.userId;
    deleteJWT(authorization);
    const result = await storeUserRefreshJWT(_id, "");
    
    if (result._id) {
      return res.json({ status: "success", message: "Loged out successfully" });
    }
  
    res.json({
      status: "error",
      message: "Unable to logg you out, plz try again later",
    });
  });

module.exports = router;