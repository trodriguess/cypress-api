/// <reference types="cypress" />

describe('Buscar Dispositivo', () => {
    it('Buscar dispositivo existente', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/3'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data['capacity GB']).to.eq(512);
            expect(response.body.data.color).to.eq('Cloudy White');
            expect(response.body.id).to.eq('3');
            expect(response.body.name).to.eq('Apple iPhone 12 Pro Max');
            
        }) 
    });
    it('Buscar dispositivo inexistente', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/3XPTO',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.error).to.eq('Oject with id=3XPTO was not found.');
        })
    });
    it('Cadastrar dispositivo', () =>{
        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: {
                "name": "Samsung Galaxy S21 Ultra",
                "data": {
                    "year": 2024,
                    "price": 6000,
                    "CPU model": "Samsung Exynos 2100",
                    "Hard disk size": "1 TB",
                    "color": "red"
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('Samsung Galaxy S21 Ultra');
            expect(response.body.data['CPU model']).to.eq('Samsung Exynos 2100');
            expect(response.body.data['Hard disk size']).to.eq('1 TB');
            expect(response.body.data.year).to.eq(2024);
            expect(response.body.data.price).to.eq(6000);
            expect(response.body.data.color).to.eq('red');
        })
    });
});