/// <reference types="cypress"/>

const payloadReservaAlterada = require('../fixtures/reserva-alterada.json');
const payloadReserva = require('../fixtures/reserva.json');
const payloadAuth = require('../fixtures/auth-config.json');

var token;

describe('Alterar Reserva', () => {

    beforeEach(() => {
        cy.login(payloadAuth).then((response) => {
            token = response.body.token;
        })
    })

    it('Alterar reserva com sucesso', () => {
        cy.nova_reserva(payloadReserva).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.status).to.eq(200);
            expect(response.body.booking.firstname).to.eq(payloadReserva.firstname);
            expect(response.body.booking.lastname).to.eq(payloadReserva.lastname);
            expect(response.body.booking.totalprice).to.eq(payloadReserva.totalprice);
            expect(response.body.booking.depositpaid).to.eq(payloadReserva.depositpaid);
            expect(response.body.booking.bookingdates.checkin).to.eq(payloadReserva.bookingdates.checkin);
            expect(response.body.booking.bookingdates.checkout).to.eq(payloadReserva.bookingdates.checkout);
            expect(response.body.booking.additionalneeds).to.eq(payloadReserva.additionalneeds);

            const reservaId = response.body.bookingid;

           cy.alterar_reserva(reservaId, token, payloadReservaAlterada).then((responseAlteracao) => {
                expect(responseAlteracao.status).to.eq(200);
                expect(responseAlteracao.body.firstname).to.eq(payloadReservaAlterada.firstname);
                expect(responseAlteracao.body.lastname).to.eq(payloadReservaAlterada.lastname);
                expect(responseAlteracao.body.totalprice).to.eq(payloadReservaAlterada.totalprice);
                expect(responseAlteracao.body.depositpaid).to.eq(payloadReservaAlterada.depositpaid);
                expect(responseAlteracao.body.bookingdates.checkin).to.eq(payloadReservaAlterada.bookingdates.checkin);
                expect(responseAlteracao.body.bookingdates.checkout).to.eq(payloadReservaAlterada.bookingdates.checkout);
                expect(responseAlteracao.body.additionalneeds).to.eq(payloadReservaAlterada.additionalneeds);
            })
        })
    })
})