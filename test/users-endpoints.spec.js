const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app')

describe('users path', () => {
    it(`responds with 401 'Missing basic token' when no basic token`, () => {
        return supertest(app)
            .get(`/playlists`)
            .expect(401)
    })
})
