const config = {
  env: process.env.NODE_ENV || "development",
  port: 3000,
  mongoUri: "mongodb://localhost/express_mongoose_boilerplate",
};

module.exports = config;
