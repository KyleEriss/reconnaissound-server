const xss = require('xss')

const PlaylistsService = {
    getVideoById(db, id) {
        return db
            .from('reconnaissound_playlists AS vidlist')
            .select(
                'vidlist.id',
                'vidlist.videoid',
                'vidlist.videotitle'
            )
            .where('vidlist.id', id)
            .first()
    },

    getPlaylistByUser(db, userId) {
        return db
            .from('reconnaissound_playlists AS vidlist')
            .select(
                'vidlist.id',
                'vidlist.videoid',
                'vidlist.videotitle'
            )
            .where('userid', userId)
    },

    deleteVideo(db, id) {
        return db('reconnaissound_playlists')
            .where({ id })
            .delete();
    },

    insertVideo(db, newVideo) {
        return db
            .insert(newVideo)
            .into('reconnaissound_playlists')
            .returning('*')
            .then(([video]) => video)
            .then(video =>
                PlaylistsService.getVideoById(db, video.id)
            )
    },

    serializeVideo(video) {
        const { user } = video
        return {
            id: video.id,
            videoid: xss(video.videoid),
            videotitle: xss(video.videotitle),
        }
    }
}

module.exports = PlaylistsService
