require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/mongoDB');
const cors = require('cors');
const PORT = process.env.PORT;

const router = require('./routes/rootRoute');

const app = express();
// invoke mongoDB connection
connectMongoDB();

// config middleware
app.use(cors());
app.use(express.json());

// routing
app.use('/', router);

app.listen(PORT, () => {
	console.log(`OK! -> Mock server is running on port ${PORT}.`);
});
