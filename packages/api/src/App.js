// API created by rogeliosamuel21

const express = require('express');
// const morgan = require('morgan');
const { v2 } = require('cloudinary');
const helmet = require('helmet');
const cors = require('cors');

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = require('./config');
const {
  API_KEY_Middleware,
  handlerErrors,
  notFound,
} = require('./middlewares');

const { authRoutes, userRotes, userEdit, socialAuth } = require('./routes/');

const app = express();

//Config
v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//Middlewares input
// app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(API_KEY_Middleware);

//Routes
app.use('/api', authRoutes);
app.use('/api', userRotes);
app.use('/api', userEdit);
app.use('/api', socialAuth);

// Middlewares output
app.use(handlerErrors);
app.use(notFound);

//Server

module.exports = app;
