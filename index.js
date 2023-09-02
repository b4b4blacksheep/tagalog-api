const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const tagalogjokesRoutes = require('./routes/tagalogjokesRoutes');

const app = express();
const port = process.env.PORT || 3000;

const dbURL = process.env.DATABASE_URL;

mongoose.connect(dbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB!'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/jokes', tagalogjokesRoutes);

app.listen(port, () => {
	console.log(`API is now running on localhost: ${port}`)
})

