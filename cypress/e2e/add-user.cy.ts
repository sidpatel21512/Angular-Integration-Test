import { slowCypressDown } from 'cypress-slow-down'
import 'cypress-slow-down/commands'

slowCypressDown(false)

describe('My First Test', () => {
    it('Visits the initial project page', () => {
      cy.visit('/')
      cy.title().should('eq','AngularIntegrationTest')

      cy.get('a').eq(0).should('have.text', 'List')
      cy.get('a').eq(1).should('have.text', 'Add')
      cy.get('a').eq(2).should('have.text', 'View')
      
      cy.get('a').eq(0).click().slowDown(300)
      cy.get('[data-cy="add-link"]').click().slowDown(300)

      cy.get('#firstname').type('billy').slowDown(300)
      cy.get('#lastname').type('batson').blur().slowDown(300)

      cy.get('#fullname').should('have.value', 'Billy Batson').slowDown(300)
      
      cy.get('#add-button').click().slowDown(300)

      cy.get('[data-index="0"]').should('have.text', 'Billy Batson').slowDown(300)
    })
  })
  