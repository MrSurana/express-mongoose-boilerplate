const { server, mongoose } = require("../server");

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
