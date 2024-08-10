const { app } = require("../../server");
const request = require("supertest");

describe("Index", function () {
  describe("GET /", function () {
    it("should print greeting", async function () {
      const res = await request(app).get("/");

      expect(res.status).toEqual(200);
      expect(res.text).toEqual("Hello world!");
    });
  });
});
