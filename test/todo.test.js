const { app, server, mongoose } = require("../server");
const request = require("supertest");

describe("Todos", function () {
  let todo = null;

  describe("GET /todos", function () {
    it("should list all todos", async function () {
      const res = await request(app).get("/todos");

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
    });
  });

  describe("POST /todos", function () {
    it("should create todo", async function () {
      const text = "Add exception handler";

      const res = await request(app).post(`/todos`).send({ text });

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.text).toEqual(text);

      todo = res.body;
    });
  });

  describe("GET /todos/:id", function () {
    it("should return todo details", async function () {
      const res = await request(app).get(`/todos/${todo.id}`);

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);
    });

    it("should not return non-existent todo details", async function () {
      const res = await request(app).get(`/todos/abcd123`);

      expect(res.statusCode).toEqual(400);
      expect(res.type).toEqual("text/html");
    });
  });

  describe("POST /todos/:id", function () {
    it("should update todo", async function () {
      const text = "Add global exception handler";

      const res = await request(app).post(`/todos/${todo.id}`).send({ text });

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);
      expect(res.body.text).toEqual(text);

      todo = res.body;
    });
  });

  describe("DELETE /todos/:id", function () {
    it("should delete todo", async function () {
      const res = await request(app).delete(`/todos/${todo.id}`);

      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);

      console.log(todo);

      todo = null;
    });
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});
