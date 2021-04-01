require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/mongoDB');
const cors = require('cors');
const PORT = process.env.PORT;

const { getAllController } = require('./controllers/getAllController');
const { createCardController } = require('./controllers/createCardController');
const { updateCardController } = require('./controllers/updateCardController');
const { createSectionController } = require('./controllers/createSectionController');
const { updateSectionController } = require('./controllers/updateSectionController');

const app = express();
// invoke mongoDB connection
connectMongoDB();

// config middleware
app.use(cors());
app.use(express.json());

// ROUTE: get all objects
app.get('/', getAllController);

// ROUTE: /create/card/
// body: Card (json object)
app.post('/create/card/', createCardController);

// ROUTE: /update/card/
// body: Card (json object)
app.post('/update/card/', updateCardController);

// ROUTE: /create/section/
// body: Section (json object)
app.post('/create/section/', createSectionController);

// ROUTE: /update
app.post('/update/section/', updateSectionController);

app.listen(PORT, () => {
	console.log(`OK! -> Mock server is running on port ${PORT}.`);
});
