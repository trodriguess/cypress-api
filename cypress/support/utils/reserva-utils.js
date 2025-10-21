import { faker } from '@faker-js/faker';

export default function geraDados() {
    const dados_reserva = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: Number(faker.finance.amount({ min: 99, max: 999, dec: 0 })),
        depositpaid: true,
        bookingdates: {
            checkin: faker.date.anytime().toString().slice(0, 9),
            checkout: "2016-01-01",
        },
        additionalneeds: "Quero café!",
    };
    return dados_reserva;
}