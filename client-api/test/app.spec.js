const chai = require("chai");
const chaiHttp = require("chai-http");
const {app} = require("../app.js");

chai.use(chaiHttp);
const expect = chai.expect;

describe("user signup", () => {
  it("should sign up a user", async () => {
    try {
      const userData = {
        name: "test user",
        phone: "999999999",
        email: "testuser@gmail.com",
        company: "test company",
        address: "test address",
        password: "password",
        confirmPass: "password",
      };

      const response = await chai.request(app).post("/v1/user").send(userData);
      expect(response).to.have.status(200);

      const userBody = response.body;
      expect(userBody).to.have.property("message").to.equal("new user created");

      const res = userBody.result;
      expect(res).to.have.property("address").to.equal("test address");
      expect(res).to.have.property("company").to.equal("test company");
      expect(res).to.have.property("email").to.equal("testuser@gmail.com");
      expect(res).to.have.property("name").to.equal("test user");
      expect(res).to.have.property("phone").to.equal(999999999);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

describe("user login", () => {
  it("should login in user", async () => {
    try {
      const userData = {
        email: "testuser@gmail.com",
        password: "password",
      };

      const response = await chai
        .request(app)
        .post("/v1/user/login")
        .send(userData);
      // console.log(response);
      expect(response).to.have.status(200);

      const userBody = response.body;
      expect(userBody).to.have.property("message").to.equal("Login Successful");
      expect(userBody).to.have.property("status").to.equal("success");
      ajwt = userBody.accessJWT;
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

describe("open ticket", () => {
  it("should open a ticket", async () => {
    try {
      const userData = {
        email: "testuser@gmail.com",
        password: "password",
      };

      const userResponse = await chai
        .request(app)
        .post("/v1/user/login")
        .send(userData);

			expect(userResponse).to.have.status(200);
			const ajwt = userResponse.body.accessJWT;

      const ticketData = {
        subject: "test ticket suject",
        sender: "test user",
        message: "test ticket synopsis",
        issueDate: new Date(),
      };

      const response = await chai
        .request(app)
        .post("/v1/ticket")
        .set("Authorization", `${ajwt}`)
        .send(ticketData);
			
      expect(response).to.have.status(200);

			const userBody = response.body;
      expect(userBody).to.have.property("status").to.equal("success");
      expect(userBody).to.have.property("message").to.equal("New ticket has been created!");
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

describe("fetch all tickets", () => {
  it("should show all tickets", async () => {
    try {
      const userData = {
        email: "testuser@gmail.com",
        password: "password",
      };

      const userResponse = await chai
        .request(app)
        .post("/v1/user/login")
        .send(userData);

			expect(userResponse).to.have.status(200);
			const ajwt = userResponse.body.accessJWT;

      const ticketData = {
        subject: "test ticket suject",
        sender: "test user",
        message: "test ticket synopsis",
        issueDate: new Date(),
      };

      const response = await chai
        .request(app)
        .get("/v1/ticket")
        .set("Authorization", `${ajwt}`)
			
      expect(response).to.have.status(200);

			const userBody = response.body;
      expect(userBody).to.have.property("status").to.equal("success");

		} catch (error) {
      console.error("Error:", error);
    }
  });
});

afterEach(function () {
  if (this.currentTest.state === "failed") {
    process.exit(1);
  }
});

after(function () {
  process.exit(0);
});
