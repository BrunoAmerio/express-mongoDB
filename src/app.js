const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const router = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : './uploads'
}));
app.use('/api', router);

module.exports= app;