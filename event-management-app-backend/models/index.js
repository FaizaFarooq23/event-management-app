const dbConfig = require("../config/config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user  = require("./user.model.js")(mongoose);
db.event = require("./event.model.js")(mongoose);
module.exports = db;