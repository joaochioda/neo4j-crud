require('dotenv').config()

const neo4j = require('neo4j-driver');
const {url, db_user,db_password,database} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_user, db_password));
const session = driver.session({database});

module.exports = session;