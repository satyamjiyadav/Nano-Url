
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/', indexRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' Database connection successful'))
.catch((err) => console.log('Error in DB connection:', err));

app.get('/test', (req, res) => {
    res.send('Test route working!');
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
