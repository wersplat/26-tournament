import React from 'react'
import ApiTest from './api-test'

describe('<ApiTest />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ApiTest />)
  })
})