const express = require("express");
const router = express.Router();

router.all('/', (req, res, next) => {
    console.log(name);
    res.json({message: "hello from ticket router"});
});

module.exports = router;