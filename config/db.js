const mongoose = require("mongoose");

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Connected to Database`);
  } catch (err) {
    console.log(`Error: ${err}`);

    process.exit(1);
  }
};

module.exports = connect;
