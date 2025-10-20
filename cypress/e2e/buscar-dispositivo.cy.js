/// <reference types="cypress" />

describe('Buscar Dispositivo', () => {
    it('Buscar dispositivo existente', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/3'
        })
    })

    it('Buscar dispositivo inexistente', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/3XPTO',
            failOnStatusCode: false
        })

    })
}
)