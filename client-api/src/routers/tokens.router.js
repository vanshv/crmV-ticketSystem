const express = require('express');
const router = express.Router();
const {verifyRefreshJWT, createAccessJWT} = require('../helpers/jwt.helper');
const { getUserByEmail } = require('../model/user/User.model');

//return refreshJWT
router.get('/', async (req, res, next) => {
    const {authorization} = req.headers;

    const decoded = await verifyRefreshJWT(authorization);

    if(!decoded.email){
        res.status(403).json({message: "forbidden"});
    }

    const userProf = await getUserByEmail(decoded.email);
    if(!userProf._id){
        res.status(403).json({message: "forbidden"});
    }

    let tokenExp = userProf.refreshJWT.addedAt;
    const db_refreshToken = userProf.refreshJWT.token;

    token = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
    );

    const today = new Date();

    // shouldn't this be or?
    if(db_refreshToken !== authorization && tokenExp < today){
        return res.status(403).json({message: "Forbidden"});
    }

    const accessJWT = await createAccessJWT(
        decoded.email,
        userProf._id.toString()
    );

    return res.json({status: "success", accessJWT});
});

module.exports = router;