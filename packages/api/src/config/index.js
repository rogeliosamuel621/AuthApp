const { config } = require('dotenv');
config();

const mode = process.env.MODE;
module.exports = {
  PORT: process.env.PORT || 8000,
  MODE: mode,
  MONGO_URI:
    mode == 'prod'
      ? process.env.MONGO_URI
      : 'mongodb://localhost:27017/AuthApp',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  EXPIRES_IN: process.env.EXPIRES_IN || '3h',
  API_KEY: process.env.API_KEY || 'api-key-secret',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
