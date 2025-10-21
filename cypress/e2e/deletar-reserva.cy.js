/// <reference types="cypress"/>

const payloadReserva = require('../fixtures/reserva.json');
const payloadAuth = require('../fixtures/auth-config.json');

var token;

describe('Deletar Reserva', () => {

    beforeEach(() => {
        cy.login(payloadAuth).then((response) => {
            token = response.body.token;
        })
    })

    it('Deletar reserva com sucesso', () => {
        cy.nova_reserva(payloadReserva).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.booking.firstname).to.eq(payloadReserva.firstname);
            expect(response.body.booking.lastname).to.eq(payloadReserva.lastname);
            expect(response.body.booking.totalprice).to.eq(payloadReserva.totalprice);
            expect(response.body.booking.depositpaid).to.eq(payloadReserva.depositpaid);
            expect(response.body.booking.bookingdates.checkin).to.eq(payloadReserva.bookingdates.checkin);
            expect(response.body.booking.bookingdates.checkout).to.eq(payloadReserva.bookingdates.checkout);
            expect(response.body.booking.additionalneeds).to.eq(payloadReserva.additionalneeds);

            const reservaId = response.body.bookingid;

            cy.deletar_reserva(reservaId, token).then((responseDelete) => {
                expect(responseDelete.status).to.eq(201);
            })
        })
    })
})