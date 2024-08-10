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

    it("should return 400 if text field not present", async function () {
      const res = await request(app).post(`/todos`).send({});

      expect(res.status).toEqual(400);
      expect(res.text).toEqual("'text' field is required");
    });
  });

  describe("GET /todos/:id", function () {
    it("should return todo details", async function () {
      const res = await request(app).get(`/todos/${todo.id}`);

      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual("object");
      expect(res.body.id).toEqual(todo.id);
    });

    it("should return 400 if todo does not exist", async function () {
      const res = await request(app).get(`/todos/66b77b57aaedb3a2427029d4`);

      expect(res.status).toEqual(400);
      expect(res.text).toEqual("Todo not found!");
    });

    it("should return 400 if id is incorrect", async function () {
      const res = await request(app).get(`/todos/test123`);

      expect(res.status).toEqual(400);
      expect(res.text).toEqual("Invalid param type");
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

    it("should return 400 if text field not present", async function () {
      const res = await request(app).put(`/todos/${todo.id}`).send({});

      expect(res.status).toEqual(400);
      expect(res.text).toEqual("'text' field is required");
    });

    it("should return 400 if todo does not exist", async function () {
      const res = await request(app)
        .put("/todos/66b77b57aaedb3a2427029d4")
        .send({ text: "Updated Todo" });

      expect(res.status).toEqual(400);
      expect(res.text).toEqual("Todo not found!");
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

    it("should return 400 if todo does not exist", async function () {
      const res = await request(app).delete("/todos/66b77b57aaedb3a2427029d4");

      expect(res.status).toEqual(400);
      expect(res.text).toEqual("Todo not found!");
    });
  });
});
