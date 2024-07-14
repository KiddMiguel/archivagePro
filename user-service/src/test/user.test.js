// test/user.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Assurez-vous que le chemin vers votre fichier principal est correct
const { expect } = chai;

chai.use(chaiHttp);

describe('User Registration', () => {
  it('should register a user with isAdmin set to true', (done) => {
    chai.request(app)
      .post('/api/users/register')
      .send({
        firstName: "Admin",
        lastName: "User",
        email: "admin.user@example.com",
        password: "Admin@1234",
        address: {
          street: "123 Admin St",
          city: "Admin City",
          postalCode: "12345",
          country: "Adminland"
        },
        isAdmin: true
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
