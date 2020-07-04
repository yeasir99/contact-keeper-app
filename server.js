const express = require("express");
const connectDB = require('./config/db');
const connectdb = require("./config/db");

const app = express();

//connectDB
connectdb();


//init middleware for parse json data
app.use(express.json({
    extended: false
}))
//Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));