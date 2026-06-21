require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO messages (username, message)
VALUES ('Amando', 'Hi there!'),
    ('Charles', 'Hello World'),
    ('Odin', 'Welcome to PostgreSQL');
`;

async function main() {
    console.log("seeding...");

    const client = new Client({
        connectionString: process.env.DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("Done");
}

main();