const connect = require('./db/connect');
const { PORT, MONGO_URI } = require('./config');
const app = require('./App');

async function main() {
  await connect(MONGO_URI);

  app.listen(PORT, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`http://localhost:${PORT}`);
  });
}

main();
