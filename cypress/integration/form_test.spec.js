/* eslint-disable no-undef */
describe("User Onboarding Form App", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
	});

	// const title = () => cy.get("h1[class='App']");
	const nameInput = () => cy.get("input[name='name']");
	const emailInput = () => cy.get("input[name='email']");
	const passwordInput = () => cy.get("input[name='password']");
	const roleInput = () => cy.get("select[name='role']");
	const submitBtn = () => cy.get("#submitBtn");
	const termsCheckbox = () => cy.get("input[name='terms']");
	const form = () => cy.get("form[class='form container']");

	it.skip("sanity checks", () => {
		expect(5).to.equal(5);
	})

	it("the proper elements exist", () => {
		nameInput().should("exist");
		emailInput().should("exist");
		passwordInput().should("exist");
		roleInput().should("exist");
		submitBtn().should("exist");
		termsCheckbox().should("exist");
		form().should("exist");
	})

	describe("write into all fields", () => {
		it("submit button is disabled", () => {
			submitBtn().should("be.disabled")
		})

		it("can type into text inputs", () => {
			nameInput().should("have.value", "").type("Name Here");
			emailInput().should("have.value", "").type("email@gmail.com");
			passwordInput().should("have.value", "").type("54321");
		})

		it("can select every dropdown option", () => {
			roleInput().should("have.value", "");
			roleInput().select("admin");
			roleInput().should("have.value", "admin");
			roleInput().select("office");
			roleInput().should("have.value", "office");
			roleInput().select("intern");
			roleInput().should("have.value", "intern");
			roleInput().select("");
			roleInput().should("have.value", "");
		})

		it("can select and de-select terms checkbox", () => {
			termsCheckbox().should("have.class", "unchecked");
			termsCheckbox().check();
			termsCheckbox().should("have.class", "checked");
			termsCheckbox().uncheck();
			termsCheckbox().should("have.class", "unchecked");
		})
	})

	describe("test submit button behavior", () => {
		it("the submit button enables if all inputs have valid input", () => {
			nameInput().type("name here");
			emailInput().type("email@gmail.com");
			passwordInput().type("98765");
			roleInput().select("admin");
			termsCheckbox().check();
			submitBtn().should("not.be.disabled");
		})

		it("proper error messages render for each field", () => {
			cy.contains(/Username must be at least 3 characters long/).should("not.exist");
			nameInput().type("na");
			cy.contains(/Username must be at least 3 characters long/).should("exist");
			nameInput().type("me");
			cy.contains(/Username must be at least 3 characters long/).should("not.exist");

			cy.contains(/Must be a valid email address/).should("not.exist");
			emailInput().type("email");
			cy.contains(/Must be a valid email address/).should("exist");
			emailInput().type("@gmail.com");
			cy.contains(/Must be a valid email address/).should("not.exist");

			cy.contains(/Password must be at least 5 characters long/).should("not.exist");
			passwordInput().type("pass");
			cy.contains(/Password must be at least 5 characters long/).should("exist");
			passwordInput().type("4");
			cy.contains(/Password must be at least 5 characters long/).should("not.exist");

			cy.contains(/this must be one of the following values: admin, office, intern/).should("not.exist")
			roleInput().select("office");
			roleInput().select("");
			cy.contains(/this must be one of the following values: admin, office, intern/).should("exist")
			roleInput().select("admin");
			cy.contains(/this must be one of the following values: admin, office, intern/).should("not.exist")

			termsCheckbox().check();
			termsCheckbox().uncheck();
			cy.contains(/this must be one of the following values: true/).should("exist");
			termsCheckbox().check();
			cy.contains(/this must be one of the following values: true/).should("not.exist");
		})

		it("submit button disables if any single input has invalid information", () => {
			nameInput().type("user");
			emailInput().type("user@mail.com");
			passwordInput().type("65432");
			roleInput().select("admin");
			termsCheckbox().check();

			nameInput().clear();
			submitBtn().should("be.disabled");
			nameInput().type("user");

			emailInput().clear();
			submitBtn().should("be.disabled");
			emailInput().type("user@mail.com");
			
			passwordInput().clear();
			submitBtn().should("be.disabled");
			passwordInput().type("65432");

			roleInput().select("");
			submitBtn().should("be.disabled");
			roleInput().select("admin");

			termsCheckbox().uncheck();
			submitBtn().should("be.disabled");
			termsCheckbox().check();
		})

		it("with valid input, submit button creates a user on click", () => {
			cy.contains(/Name: user/).should("not.exist");
			nameInput().type("user");
			emailInput().type("user@mail.com");
			passwordInput().type("65432");
			roleInput().select("admin");
			termsCheckbox().check();
			submitBtn().click();
			cy.contains(/Name: user/).should("exist");
		})
	})

})