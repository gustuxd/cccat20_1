import axios from "axios";

const baseDomainUrl = "http://localhost:3000";
axios.defaults.validateStatus = () => true;

test("Should create passenger account when inputs are valid", async function name() {
   const input = {
      name: "John Doe",
      email: `email${Math.random()}@email.com`,
      password: "asdQWE123",
      cpf: "19119119100",
      isPassenger: true,
   }
   const postAccountResponse = await axios.post(baseDomainUrl + "/signup", input);
   const accountId = postAccountResponse.data.accountId;
   const getAccountResponse = await axios.get(baseDomainUrl + `/accounts/${accountId}`);
   const output = getAccountResponse.data;
   expect(output.account_id).toBe(accountId);
   expect(output.name).toBe(input.name);
   expect(output.email).toBe(input.email);
   expect(output.cpf).toBe(input.cpf);
   expect(output.car_plate).toBeNull();
   expect(output.is_passenger).toBe(input.isPassenger);
   expect(output.is_driver).toBeFalsy();
   expect(output.password).toBe(input.password);
});

test("Should create driver account when inputs are valid", async function name() {
   const input = {
      name: "John Doe",
      email: `email${Math.random()}@email.com`,
      password: "asdQWE123",
      cpf: "19119119100",
      isPassenger: false,
      isDriver: true,
      carPlate: "ABC1234"
   }
   const postAccountResponse = await axios.post(baseDomainUrl + "/signup", input);
   const accountId = postAccountResponse.data.accountId;
   const getAccountResponse = await axios.get(baseDomainUrl + `/accounts/${accountId}`);
   const output = getAccountResponse.data;
   expect(output.account_id).toBe(accountId);
   expect(output.name).toBe(input.name);
   expect(output.email).toBe(input.email);
   expect(output.cpf).toBe(input.cpf);
   expect(output.car_plate).toBe(input.carPlate);
   expect(output.is_passenger).toBe(input.isPassenger);
   expect(output.is_driver).toBe(input.isDriver);
   expect(output.password).toBe(input.password);
});

test("Should not create account when cpf is invalid", async function () {
   const input = {
      name: "John Doe",
      email: `email${Math.random()}@email.com`,
      cpf: "111",
      password: "asdQWE123",
      isPassenger: true
   };
   const response = await axios.post(baseDomainUrl + "/signup", input);
   const output = response.data;
   expect(output.message).toBe("Invalid CPF");
});

test("Should not create account when email is invalid", async function () {
   const input = {
      name: "John Doe",
      email: `invalidEmail${Math.random()}`,
      cpf: "97456321558",
      password: "asdQWE123",
      isPassenger: true
   };
   const response = await axios.post(baseDomainUrl + "/signup", input);
   const output = response.data;
   expect(output.message).toBe("Invalid email");
});

test("Should not create account when name is invalid", async function () {
   const input = {
      name: "John",
      email: `email${Math.random()}@email.com`,
      cpf: "19119119100",
      password: "asdQWE123",
      isPassenger: true
   };
   const response = await axios.post(baseDomainUrl + "/signup", input);
   const output = response.data;
   expect(output.message).toBe("Invalid name");
});

test("Should not create account when email is already registered", async function () {
   const input = {
      name: "John Doe",
      email: `email${Math.random()}@email.com`,
      cpf: "19119119100",
      password: "asdQWE123",
      isPassenger: true
   };
   await axios.post(baseDomainUrl + "/signup", input);
   const secondResponse = await axios.post(baseDomainUrl + "/signup", input);
   const output = secondResponse.data;
   expect(output.message).toBe("Account already exists");
});

test("Should not create account when password is invalid", async function () {
   const input = {
      name: "John Doe",
      email: `email${Math.random()}@email.com`,
      cpf: "19119119100",
      password: "111",
      isPassenger: true
   };
   await axios.post(baseDomainUrl + "/signup", input);
   const secondResponse = await axios.post(baseDomainUrl + "/signup", input);
   const output = secondResponse.data;
   expect(output.message).toBe("Invalid password");
});

test("Should not create account when car plate is invalid", async function () {
   const input = {
      name: "John Doe",
      email: `email${Math.random()}@email.com`,
      cpf: "19119119100",
      password: "asdQWE123",
      isDriver: true,
      carPlate: "123"
   };
   await axios.post(baseDomainUrl + "/signup", input);
   const secondResponse = await axios.post(baseDomainUrl + "/signup", input);
   const output = secondResponse.data;
   expect(output.message).toBe("Invalid car plate");
});
