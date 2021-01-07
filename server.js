const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// connect to db
connectDB();

// enable req.body access
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/items', require('./routes/api/item'));

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// set statis folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
