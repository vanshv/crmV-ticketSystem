const express = require("express");
const {route, post} = require('./ticket.router');
const router = express.Router();
const {insertUser, getUserByEmail} = require('../model/user/User.model');
const {hashPassword, comparePassword} = require('../helpers/bcrypt.helper');

router.all('/', (req, res, next) => {
    // res.json({message: "hello from user router"});

    next();
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
        console.log(result);

        res.json({message: "new user created", result});
    } catch(error){
        console.log(error);
        res.json({statux: 'error', message: error.message});
    }
});

//User sign in router
router.post('/login', async(req, res) => {
    console.log(req.body);
    console.log('hello')

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
    console.log(result);

    res.json({staus: "success", message: "Login succesful"});
});

module.exports = router;