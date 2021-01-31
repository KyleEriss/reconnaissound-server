const xss = require('xss')

const PlaylistsService = {
    getVideoById(db, id) {
        return db
            .from('reconnaissound_playlists AS vidlist')
            .select(
                'vidlist.id',
                'vidlist.embedvideo',
                'vidlist.videotitle'
            )
            .where('vidlist.id', id)
            .first()
    },

    getPlaylistByUser(db, userId) {
        return db
            .from('reconnaissound_playlists')
            .select(
                'id',
                'embedvideo',
                'videotitle'
            )
            .where('userid', userId)
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
            embedvideo: xss(video.embedvideo),
            videotitle: xss(video.videotitle),
            // user: {
            //     id: user.id,
            //     username: user.username
            // },
        }
    }
}

module.exports = PlaylistsService




// const PlaylistsService = {
//     getAllvideos(db) {
//         return db('reconnaissound_playlists')
//             .select('*');
//     },

//     insertvideo(db, data) {
//         return db('reconnaissound_playlists')
//             .insert(data)
//             .returning('*')
//             .then(rows => rows[0]);
//     },

//     getById(db, id) {
//         return db('reconnaissound_playlists')
//             .select('*')
//             .where({ id })
//             .first();
//     },

//     deletevideo(db, id) {
//         return db('reconnaissound_playlists')
//             .where({ id })
//             .delete();
//     },

//     updatevideo(db, id, data) {
//         return db('reconnaissound_playlists')
//             .where({ id })
//             .update(data);
//     }
// };

// module.exports = PlaylistsService;