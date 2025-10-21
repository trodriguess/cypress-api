# Projeto: Testes de API com Cypress

Resumo
---
Este repositório contém uma suíte de testes de API criada com Cypress para validar endpoints públicos (ex.: Restful Booker e um serviço de objetos). Os testes cobrem criação, busca, alteração e exclusão de reservas, além de operações sobre dispositivos.

Arquivos principais
---
- [.gitignore](.gitignore)  
- [cypress.config.js](cypress.config.js) — configurações do Cypress (inclui `baseUrl`).
- [package.json](package.json)

Pasta de testes e suporte
- [cypress/](cypress/)
  - [cypress/e2e/buscar-dispositivo.cy.js](cypress/e2e/buscar-dispositivo.cy.js)
  - [cypress/e2e/cadastrar-reserva.cy.js](cypress/e2e/cadastrar-reserva.cy.js)
  - [cypress/e2e/alterar-reserva.cy.js](cypress/e2e/alterar-reserva.cy.js)
  - [cypress/e2e/deletar-reserva.cy.js](cypress/e2e/deletar-reserva.cy.js)
  - [cypress/fixtures/auth-config.json](cypress/fixtures/auth-config.json)
  - [cypress/fixtures/dispositivo.json](cypress/fixtures/dispositivo.json)
  - [cypress/fixtures/reserva.json](cypress/fixtures/reserva.json)
  - [cypress/fixtures/reserva-alterada.json](cypress/fixtures/reserva-alterada.json)
  - [cypress/support/commands.js](cypress/support/commands.js)
  - [cypress/support/e2e.js](cypress/support/e2e.js)
  - [cypress/support/utils/reserva-utils.js](cypress/support/utils/reserva-utils.js)
  - [cypress/downloads/](cypress/downloads/)

Comandos customizados
---
As interações com a API para fluxo de reservas estão encapsuladas em comandos Cypress definidos em [cypress/support/commands.js](cypress/support/commands.js):

- [`Cypress.Commands.add('login')`](cypress/support/commands.js) — obtém token de autenticação.
- [`Cypress.Commands.add('nova_reserva')`](cypress/support/commands.js) — cria uma reserva.
- [`Cypress.Commands.add('alterar_reserva')`](cypress/support/commands.js) — altera uma reserva (usa Cookie com token).
- [`Cypress.Commands.add('deletar_reserva')`](cypress/support/commands.js) — deleta uma reserva (usa Cookie com token).

Gerador de dados
---
- [`geraDados`](cypress/support/utils/reserva-utils.js) — usa [`@faker-js/faker`](package.json) para gerar dados de reserva dinâmicos (import em [cypress/support/utils/reserva-utils.js](cypress/support/utils/reserva-utils.js)).

Cenários de teste cobertos
---
1. Buscar / Operações sobre dispositivo
   - Arquivo: [cypress/e2e/buscar-dispositivo.cy.js](cypress/e2e/buscar-dispositivo.cy.js)
   - Cenários:
     - "Buscar dispositivo existente": GET `/objects/3` valida status 200 e campos (ex.: `capacity GB`, `color`, `id`, `name`).
     - "Buscar dispositivo inexistente": GET `objects/3XPTO` espera `404` e mensagem de erro.
     - "Cadastrar dispositivo": POST `/objects` com `cypress/fixtures/dispositivo.json` e valida campos retornados.

2. Cadastrar reserva
   - Arquivo: [cypress/e2e/cadastrar-reserva.cy.js](cypress/e2e/cadastrar-reserva.cy.js)
   - Cenário:
     - POST `https://restful-booker.herokuapp.com/booking` com `cypress/fixtures/reserva.json` e valida retorno (status, bookingid e campos do booking).

3. Alterar reserva
   - Arquivo: [cypress/e2e/alterar-reserva.cy.js](cypress/e2e/alterar-reserva.cy.js)
   - Fluxo:
     - Autentica com [`Cypress.Commands.add('login')`](cypress/support/commands.js), obtém token.
     - Cria reserva com [`Cypress.Commands.add('nova_reserva')`](cypress/support/commands.js) usando `cypress/fixtures/reserva.json`.
     - Altera a reserva com [`Cypress.Commands.add('alterar_reserva')`](cypress/support/commands.js) passando id, token e `cypress/fixtures/reserva-alterada.json`.
     - Valida que os campos foram atualizados.

4. Deletar reserva
   - Arquivo: [cypress/e2e/deletar-reserva.cy.js](cypress/e2e/deletar-reserva.cy.js)
   - Fluxo:
     - Autentica, cria reserva e então deleta via [`Cypress.Commands.add('deletar_reserva')`](cypress/support/commands.js).
     - Valida status esperado (201 no projeto atual).

Tecnologias e bibliotecas utilizadas
---
- Cypress — framework de testes end-to-end e de API. (configurado em [cypress.config.js](cypress.config.js))
- Node.js / npm — gerenciador de dependências ([package.json](package.json)).
- @faker-js/faker — geração de dados falsos (usado em [cypress/support/utils/reserva-utils.js](cypress/support/utils/reserva-utils.js)).
- APIs públicas consumidas:
  - https://restful-booker.herokuapp.com (fluxos de reserva)
  - https://api.restful-api.dev (baseUrl usado em [cypress.config.js](cypress.config.js) para testes de objetos)

Como executar os testes
---
1. Instalar dependências:
   ```sh
   npm install