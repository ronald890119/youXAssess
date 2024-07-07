const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// express app
const app = express();
app.use(express.json());
app.use(cors());

// routes
const uniRoute = require('./routes/uniRoute');
app.use('/uni', uniRoute);

// listen on port 5000
app.listen(5000, function () {
	console.log("Listening on port 5000");
});

// useful for development (printing status code)
app.use(morgan("dev"));

module.exports = app;