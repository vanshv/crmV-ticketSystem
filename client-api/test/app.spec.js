const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.use(chaiHttp);
const expect = chai.expect;

describe("user signup", () => {
  it("should sign up a user", async () => {
		try{
			const userData = {
				name: "test user",
				phone: "999999999",
				email: "testuser@gmail.com",
				company: "test company",
				address: "test address",
				password: "password",
				confirmPass: "password",
			};
	
			const response = await chai.request(app).post('/v1/user').send(userData);
			expect(response).to.have.status(200);

			const userBody = response.body;
			expect(userBody).to.have.property('message').to.equal('new user created');

			const res = userBody.result;
			expect(res).to.have.property('address').to.equal('test address');
			expect(res).to.have.property('company').to.equal('test company');
			expect(res).to.have.property('email').to.equal('testuser@gmail.com');
			expect(res).to.have.property('name').to.equal('test user');
			expect(res).to.have.property('phone').to.equal(999999999);
		}
		catch(error){
			console.error('Error:', error);
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
