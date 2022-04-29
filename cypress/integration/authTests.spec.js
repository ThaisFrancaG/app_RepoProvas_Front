describe("SignUp", () => {
  const BASE_URL = "http://localhost:5001";

  it("Should allow for a sucessuful sing-up=", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get("input[id=email]").type("cypressUser@email.com");
    cy.get("input[id=password]").type("123456");
    cy.get("input[id=passwordCheck]").type("123456");
    cy.intercept({ method: "POST", url: "/sign-up" }).as("postAuth");
    cy.get("button[id=submit]").click();
    cy.wait("@postAuth");

    cy.url().should("equal", "http://localhost:3000/");
  });
});
