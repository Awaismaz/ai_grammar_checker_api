require("dotenv").config("../.env");
const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = {
  secret: process.env.SESSION_SECRET || 'abc123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
