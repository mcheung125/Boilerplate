const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../db/User');

// collect our google config into an object
const googleConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback',
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(
	token,
	refreshToken,
	profile,
	done
) {
	const googleId = profile.id;
	const name = profile.displayName;
	const email = profile.emails[0].value;

	User.findOrCreate({
		where: { googleId },
		defaults: { name, email },
	})
		.then(([user]) => done(null, user))
		.catch(done);
});

// register our strategy with passport
passport.use(strategy);

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get(
	'/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login',
	})
);

module.exports = router
