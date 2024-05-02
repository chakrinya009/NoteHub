const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors')

const app = express()
require("dotenv").config();
const port = process.env.PORT ||  5000  //changes the port so because react  also run at 3000
connectToMongoose(process.env.MONGO_URI);
app.use(express.json());
app.use(cors());

//Available routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/notes', require('./routes/notes') );


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})