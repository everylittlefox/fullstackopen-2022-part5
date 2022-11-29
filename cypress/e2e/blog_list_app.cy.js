describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', '/api/users', {
        username: 'root',
        name: 'root',
        password: 'root'
      })
    })

    it('succeeds with correct credentials', function () {
      cy.get('[name="username"]').type('root')
      cy.get('[name="password"]').type('root')
      cy.get('button').click()
      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[name="username"]').type('boot')
      cy.get('[name="password"]').type('root')
      cy.get('button').click()
      cy.contains('wrong username or password').should('have.class', 'error')
    })
  })
})
