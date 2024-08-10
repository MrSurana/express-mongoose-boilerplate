const { app } = require("../../server");
const request = require("supertest");

describe("Todos", function () {
  let todo = null;

  describe("GET /todos", function () {
    it("should list all todos", async function () {
      const res = await request(app).get("/todos");

      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
    });
  });

  describe("POST /todos", function () {
    it("should create todo", async function () {
      const text = "Add exception handler";

      const res = await request(app).post(`/todos`).send({ text });

      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.text).toEqual(text);

      todo = res.body;
    });
  });

  describe("GET /todos/:id", function () {
    it("should return todo details", async function () {
      const res = await request(app).get(`/todos/${todo.id}`);

      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);
    });

    it("should not return non-existent todo details", async function () {
      const res = await request(app).get(`/todos/abcd123`);

      expect(res.status).toEqual(400);
      expect(res.body).toEqual("'id' param is an invalid todo id");
    });
  });

  describe("POST /todos/:id", function () {
    it("should update todo", async function () {
      const text = "Add global exception handler";

      const res = await request(app).put(`/todos/${todo.id}`).send({ text });

      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);
      expect(res.body.text).toEqual(text);

      todo = res.body;
    });

    it("should return 400 if id is invalid", async function () {
      const res = await request(app)
        .put("/todos/123")
        .send({ text: "Updated Todo" });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual("'id' param is an invalid todo id");
    });
  });

  describe("DELETE /todos/:id", function () {
    it("should delete todo", async function () {
      const res = await request(app).delete(`/todos/${todo.id}`);

      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);

      todo = null;
    });
  });
});
