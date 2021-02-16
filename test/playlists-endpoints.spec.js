const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app')

describe('playlists path', () => {
    it(`responds with 401 'Missing basic token' when no basic token`, () => {
        return supertest(app)
            .get(`/playlists`)
            .expect(401)
    })
})

// const token = helpers.getAuthToken(1, 'testuser');

// return supertest(app) .get('/api/movies') .set('Authorization', Bearer ${token}) .expect(200);