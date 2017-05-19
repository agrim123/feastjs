var pgp = require('pg-promise')()
var dotenv = require('dotenv')
dotenv.load()

var db_url = process.env.DATABASE_URL

var db = pgp(db_url)

console.log('Setting up database')

db.query('\
  CREATE TABLE IF NOT EXISTS session(\
  sid varchar NOT NULL COLLATE "default",\
  sess json NOT NULL,\
  expire timestamp(6) NOT NULL\
  )\
  WITH (OIDS=FALSE);\
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;\
  ')
.then(function(){
  console.log('Successfully completed!')
})
.catch(function (error) {
  console.log('ERROR:', error)
})
