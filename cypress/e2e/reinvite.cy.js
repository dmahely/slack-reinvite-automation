describe('slack reinvite', () => {
    it('passes', () => {

        // set a huge viewport to be able to see the full list
        // otherwise, cypress will only get the first 10 or so
        // users which are visible in the viewport
        cy.viewport(3000, 3000)

        // sign into Slack workspace as an admin
        cy.visit(Cypress.env('SLACK_WORKSPACE_URL'))
        cy.contains('sign in with a password instead').click()
        cy.get('#email').type(Cypress.env('SLACK_USER_EMAIL'))
        cy.get('#password').type(Cypress.env('SLACK_USER_PASSWORD'))
        cy.get('#signin_btn').scrollIntoView()
        cy.get('#signin_btn').click()

        // use filter to get list of invited users
        cy.get('button').contains('Filter').click()
        cy.get('.c-label').contains('Invited').click()
        cy.get('button').contains('Filter').click({ force: true })
        cy.wait(3000)

        // loop over invited users and resend invites
        cy.get('.c-action_buttons__button').each(($el) => {
            cy.wrap($el).click()
            cy.get('.c-menu__items').then(($menu) => {
                if ($menu.text().includes('Activate account')) {
                    cy.wrap($el).click({ force: true })
                } else {
                    cy.contains('Resend invitation').click()
                    cy.contains('Resend Invitation').click()
                }
                cy.wait(2000)
            })
        })
    })
})