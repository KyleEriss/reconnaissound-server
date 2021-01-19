const UsersService = {
    getAllUsers(db) {
        return db.select('*').from('reconnaissound_users')
    },

    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('reconnaissound_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(db, id) {
        return db
            .from('reconnaissound_users')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteUser(db, id) {
        return db('reconnaissound_users')
            .where({ id })
            .delete()
    },

    updateUser(db, id, newUserFields) {
        return db('reconnaissound_users')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersService