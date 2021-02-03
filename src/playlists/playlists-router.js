const path = require('path')
const express = require('express')
const xss = require('xss')
const PlaylistsService = require('./playlists-service')
const { requireAuth } = require('../middleware/jwt-auth')

const playlistRouter = express.Router()
const jsonParser = express.json()

playlistRouter
    .route('/')
    .get(requireAuth, jsonParser, (req, res, next) => {
        const userId = req.user.id
        PlaylistsService.getPlaylistByUser(
            req.app.get('db'),
            userId
        )
            .then(videos => {
                res.json(videos.map(PlaylistsService.serializeVideo))
            })
            .catch(next)
    })

    .post(requireAuth, jsonParser, (req, res, next) => {
        const { videoid, videotitle } = req.body
        const userId = req.user.id
        const newvideo = { videoid, videotitle }

        for (const [key, value] of Object.entries(newvideo))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })

        newvideo.userid = req.user.id
        PlaylistsService.insertVideo(
            req.app.get('db'),
            newvideo
        )
            .then(video => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${video.id}`))
                    .json(PlaylistsService.serializeVideo(video))
            })
            .catch(next)
    })

playlistRouter
    .route('/:videoId')
    .all(requireAuth, jsonParser, (req, res, next) => {
        PlaylistsService.getVideoById(
            req.app.get('db'),
            req.params.videoId
        )
            .then(video => {
                if (!video) {
                    return res.status(404).json({
                        error: { message: `video doesn't exist` }
                    })
                }
                res.video = video
                next()
            })
            .catch(next)
    })
    // .get(requireAuth, jsonParser, (req, res, next) => {
    //     res.json(serializeVideo(res.video))
    // })
    .delete(requireAuth, jsonParser, (req, res, next) => {
        PlaylistsService.deleteVideo(
            req.app.get('db'),
            req.params.videoId
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })

    // .patch(jsonParser, (req, res, next) => {
    //     const { userid, embedvideo, videotitle } = req.body
    //     const videoToUpdate = { userid, embedvideo, videotitle }

    //     const numberOfValues = Object.values(videoToUpdate).filter(Boolean).length
    //     if (numberOfValues === 0) {
    //         return res.status(400).json({
    //             error: {
    //                 message: `Request body must contain  'user id'and 'video url'`
    //             }
    //         })
    //     }

    //     PlaylistsService.updatevideo(
    //         req.app.get('db'),
    //         req.params.videoId,
    //         videoToUpdate
    //     )
    //         .then(numRowsAffected => {
    //             res.status(204).end()
    //         })
    //         .catch(next)
    // })

module.exports = playlistRouter