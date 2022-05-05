const { app } = require("../server");
const request = require("supertest");

describe("Todos", function () {
  let todo = null;

  describe("GET /todos", function () {
    it("should list all todos", async function () {
      const res = await request(app).get("/todos");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // describe("POST /todos", function () {
  //   it("should create todo", async function () {
  //     const text = "Add exception handler";

  //     const res = await chai.request(app).post(`/todos`).send({ text });

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an("object");
  //     expect(res.body.text).to.be.equal(text);

  //     todo = res.body;
  //   });
  // });

  // describe("GET /todos/:id", function () {
  //   it("should return todo details", async function () {
  //     const res = await chai.request(app).get(`/todos/${todo.id}`);

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an("object");
  //     expect(res.body.id).to.be.equal(todo.id);
  //   });

  //   it("should not return non-existent todo details", async function () {
  //     const res = await chai.request(app).get(`/todos/abcd123`);

  //     expect(res).to.have.status(400);
  //     expect(res.type).to.be.equal("text/html");
  //   });
  // });

  // describe("POST /todos/:id", function () {
  //   it("should update todo", async function () {
  //     const text = "Add global exception handler";

  //     const res = await chai
  //       .request(app)
  //       .post(`/todos/${todo.id}`)
  //       .send({ text });

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an("object");
  //     expect(res.body.id).to.be.equal(todo.id);
  //     expect(res.body.text).to.be.equal(text);

  //     todo = res.body;
  //   });
  // });

  // describe("DELETE /todos/:id", function () {
  //   it("should delete todo", async function () {
  //     const res = await chai.request(app).delete(`/todos/${todo.id}`);

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.be.an("object");
  //     expect(res.body.id).to.be.equal(todo.id);

  //     todo = null;
  //   });
  // });
});
