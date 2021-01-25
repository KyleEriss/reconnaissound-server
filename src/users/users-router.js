const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    password: xss(user.password),
})

usersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { username, password } = req.body
        const newUser = { username, password }

        for (const [key, value] of Object.entries(newUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        UsersService.insertUser(
            req.app.get('db'),
            newUser
        )
            .then(user => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                    .json(user)
            })
            .catch(next)
    })

usersRouter
    .route('/:userId')
    .all((req, res, next) => {
        UsersService.getById(
            req.app.get('db'),
            req.params.userId
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `user doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })

    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.userId
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { username, password } = req.body
        const userToUpdate = { username, password }

        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain 'username, password'`
                }
            })

        UsersService.updateUser(
            req.app.get('db'),
            req.params.userId,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })



module.exports = usersRouter
