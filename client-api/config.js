require('dotenv').config();

const config = {
    prod: {
      mongoUrl: process.env.PROD_MONGO_URL,
      redisUrl: process.env.PROD_REDIS_URL,
    },
    test: {
      mongoUrl: process.env.TEST_MONGO_URL,
      redisUrl: process.env.TEST_REDIS_URL,
    },
};

module.exports = {
    config,
};