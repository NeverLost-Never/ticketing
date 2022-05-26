import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({
			email: "test@test.com",
			password: "password",
		})
		.expect(201);
});

it("returns a 400 with a invalid email", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({ email: "testtest.com", password: "password" })
		.expect(400);
});

it("returns a 400 with a invalid password", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({ email: "test@test.com", password: "" })
		.expect(400);
});

it("returns a 400 with missing email and password", async () => {
	return request(app)
		.post("/api/users/signup")
		.send({ email: "", password: "" })
		.expect(400);
});

it("disallows duplicate emails", async () => {
	await request(app)
		.post("/api/users/signup")
		.send({ email: "testing@test.com", password: "password" })
		.expect(201);

	await request(app)
		.post("/api/users/signup")
		.send({ email: "testing@test.com", password: "password" })
		.expect(400);
});

it("sets a cookie after successfull signup", async () => {
	const response = await request(app)
		.post("/api/users/signup")
		.send({ email: "test@test.com", password: "password" })
		.expect(201);

	expect(response.get("Set-Cookie")).toBeDefined();
});
