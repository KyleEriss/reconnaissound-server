CREATE TABLE reconnaissound_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    fullname TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);