/// <reference types="cypress"/>


Cypress.Commands.add('login', (payload) => {
    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        body: payload
    })
});

Cypress.Commands.add('alterar_reserva', (Id, token, payload) => {
    cy.request({
        method: 'PUT',
        url: `https://restful-booker.herokuapp.com/booking/${Id}`,
        headers: {
            Cookie: `token=${token}`
        },
        body: payload
    })
});

Cypress.Commands.add('nova_reserva', (payload) => {
    cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: payload
    })
});

Cypress.Commands.add('deletar_reserva', (Id, token) => {
    cy.request({
        method: 'DELETE',
        url: `https://restful-booker.herokuapp.com/booking/${Id}`,
        headers: {
            Cookie: `token=${token}`
        }
    })
});