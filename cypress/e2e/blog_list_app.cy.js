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

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('[name="username"]').type('root')
        cy.get('[name="password"]').type('root')
        cy.get('button').click()
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('[name="title"]').type('new title')
        cy.get('[name="author"]').type('new author')
        cy.get('[name="url"]').type('new url')
        cy.get('[type="submit"]').click()

        cy.contains('new blog: "new title" by new author').should(
          'have.class',
          'success'
        )
      })

      describe('operating on blogs', function () {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.get('[name="title"]').type('first blog title')
          cy.get('[name="author"]').type('first blog author')
          cy.get('[name="url"]').type('first blog url')
          cy.get('[type="submit"]').click()

          cy.get('[name="title"]').type('second blog title')
          cy.get('[name="author"]').type('second blog author')
          cy.get('[name="url"]').type('second blog url')
          cy.get('[type="submit"]').click()
        })

        it('A blog can be liked', function () {
          cy.contains('view').click()
          cy.get('.like-button').click()
          cy.contains('likes 1')
        })
      })
    })
  })
})
