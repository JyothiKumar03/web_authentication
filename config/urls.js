require("dotenv").config({ path: "..//env" });
module.exports = {
  mongoURL: process.env.DB_CONNECT,
};
