const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connection done");
  })
  .catch((e) => {
    console.log(e);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66d6b0b82ad57aa48e0bd0e8",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initilized");
};

initDB();
