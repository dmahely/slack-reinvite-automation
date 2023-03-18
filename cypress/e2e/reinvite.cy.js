describe('slack reinvite', () => {
    it('passes', () => {
        // sign into Slack workspace as an admin
        cy.visit(Cypress.env('SLACK_WORKSPACE_URL'))
        cy.contains('sign in with a password instead').click()
        cy.get('#email').type(Cypress.env('SLACK_USER_EMAIL'))
        cy.get('#password').type(Cypress.env('SLACK_USER_PASSWORD'))
        cy.get('#signin_btn').scrollIntoView()
        cy.get('#signin_btn').click()

        // use filter to get list of invited users
        cy.get('button').contains('Filter').click()
        cy.get('.c-label.c-label--inline.c-label--pointer.c-label--with_formatted_text').contains('Invited').click()
        cy.get('button').contains('Filter').click({ force: true })
        cy.wait(3000)

        // loop over invited users and resend invites
        cy.get('.c-action_buttons__button').each(($el) => {
            cy.wrap($el).click()
            cy.contains('Resend invitation').click()
            cy.wait(1000)
            cy.contains('Resend Invitation').click()
            cy.wait(3000)
        })
    })
})