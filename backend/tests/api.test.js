const request = require("supertest");
const app = require("../src/server");

describe("GlobeTrotter Phase 1 API", () => {

    test("GET / should return API running message", async () => {
        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("GlobeTrotter API is running");
    });

    test("GET /destinations should return destinations", async () => {
        const response = await request(app)
            .get("/destinations");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("GET /recommendations should return recommendations", async () => {
        const response = await request(app)
            .get("/recommendations");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("recommendations");
    });

    test("GET /itineraries without JWT should be rejected", async () => {
        const response = await request(app)
            .get("/itineraries");

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe("Access token required");
    });

});