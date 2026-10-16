const { test, describe } = require('node:test')
const assert = require('node:assert')
const { User } = require('../database.js')

const { user } = require('../utils/forTesting')

describe('Test user functionalities', () => {
  test('Received user information', () => {
    assert.notEqual(user(), '')
  })

  test('User password is hashed', () => {
    assert.equal(user(),'')
  })

  test('User can be found', () => {
    assert.equal(user(),'')
  })
})