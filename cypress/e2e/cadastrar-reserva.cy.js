/// <reference types="cypress"/>

const payloadReserva = require('../fixtures/reserva.json');

describe('Cadastrar Reserva', () => {
    it('Cadastrar reserva com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: payloadReserva
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.bookingid).not.NaN;
            expect(response.body.bookingid).to.greaterThan(0);
            expect(response.body.booking.firstname).to.eq(payloadReserva.firstname);
            expect(response.body.booking.lastname).to.eq(payloadReserva.lastname);
            expect(response.body.booking.totalprice).to.eq(payloadReserva.totalprice);
            expect(response.body.booking.depositpaid).to.eq(payloadReserva.depositpaid);
            expect(response.body.booking.bookingdates.checkin).to.eq(payloadReserva.bookingdates.checkin);
            expect(response.body.booking.bookingdates.checkout).to.eq(payloadReserva.bookingdates.checkout);
            expect(response.body.booking.additionalneeds).to.eq(payloadReserva.additionalneeds);
        });
    })
})