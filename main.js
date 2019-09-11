const app = require('./server');
const db = require('./server/db/db.js');

// Server
const port = process.env.PORT || 3000;
db.sync().then(() => {
	app.listen(port, () => {
		console.log('Knock, knock');
		console.log("Who's there?");
		console.log(`Your server, listening on port ${port}`);
	});
});
