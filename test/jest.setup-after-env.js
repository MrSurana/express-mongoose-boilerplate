const { server, mongoose } = require("../server");

afterAll(async () => {
  await mongoose.disconnect();
  await server.close();
});
