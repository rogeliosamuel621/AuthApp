const mongoose = require('mongoose');

async function connection(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('DB connected');
  } catch (error) {
    console.log(error);

    throw new Error('INTERNAL SERVER ERROR');
  }
}

module.exports = connection;
