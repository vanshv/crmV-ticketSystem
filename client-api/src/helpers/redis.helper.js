const redis = require('redis');

const { config } = require('../../config');

const env = process.env.NODE_ENV;
console.log(env);
const redisUrl = config[env].redisUrl;
console.log(redisUrl);

const client = redis.createClient(redisUrl);

client.on('open', () => {
  console.log('redis is connected');
});
client.on('error', (error) => {
  console.log(error);
});

const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      return client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
