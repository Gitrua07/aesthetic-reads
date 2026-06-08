/*attach a user id to this*/
CREATE TABLE IF NOT EXISTS moodboards (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)

/*attach moodboards id to this */
CREATE TABLE IF NOT EXISTS book (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    summary TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS user (
    id SERIAL PRIMARY KEY,
    real_name TEXT NOT NULL,
    passkey TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NULL 
)