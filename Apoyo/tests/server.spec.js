const request = require("supertest");
const app = require("../src/index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes - debería retornar todos los cafés", async () => {
        const response = await request(app).get("/cafes");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("DELETE /cafes/:id - debería retornar 404 si el café no existe", async () => {
        const response = await request(app).delete("/cafes/999").set('Authorization', 'Bearer token');
        expect(response.status).toBe(404);
    });

    it("POST /cafes - debería agregar un nuevo café", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(app).post("/cafes").send(nuevoCafe);
        expect(response.status).toBe(201);
    });

    it("PUT /cafes/:id - debería retornar 400 si el ID no coincide", async () => {
        const cafeActualizado = { id: 6, nombre: "Latte Actualizado" };
        const response = await request(app).put("/cafes/5").send(cafeActualizado);
        expect(response.status).toBe(400);
    });
});
