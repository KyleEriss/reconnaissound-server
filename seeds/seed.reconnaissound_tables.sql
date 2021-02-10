BEGIN;

TRUNCATE
  reconnaissound_users,
  reconnaissound_playlists
  RESTART IDENTITY CASCADE;

INSERT INTO reconnaissound_users (username, password)
VALUES
  ('otto', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('emily', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('kyle', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('theHoot', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('gremlin', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('papusa', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

INSERT INTO reconnaissound_playlists (userid, videoid, videotitle)
VALUES
  (2, 'videoid1','videotitle1'),
  (3, 'videoid2', 'videotitle2'),
  (1, 'videoid3', 'videotitle3'),
  (6, 'videoid4', 'videotitle5'),
  (5, 'videoid5', 'videotitle6'),
  (3, 'videoid6', 'videotitle7'),
  (4, 'videoid7', 'videotitle8'),
  (6, 'videoid8', 'videotitle9'),
  (1, 'videoid9', 'videotitle10'),
  (1, 'videoid10', 'videotitle11');

COMMIT;
