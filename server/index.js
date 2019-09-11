//Entry Point for server
const express = require('express');
// const morgan = require('morgan');
const volleyball = require('volleyball')
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const User = require('./db/User')

const app = express();

if (process.env.NODE_ENV === 'development') {
	require('./localSecrets'); // this will mutate the process.env object with your secrets.
}

const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

// Logging middleware
// app.use(morgan('dev'));
app.use(volleyball)

// Static middleware
app.use(express.static(path.join(__dirname, '../public')));

// Parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(done);
});

// Matches all requests to /api
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// Sends user to index.html for requets that don't match api routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 500 error handler
app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
