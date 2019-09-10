const app = require('./server')

// Server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Knock, knock");
    console.log("Who's there?");
    console.log(`Your server, listening on port ${port}`);
})
