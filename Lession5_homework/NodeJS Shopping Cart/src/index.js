const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
require("./config/mongoose.js")(app);
app.use('./files', express.static('files'));
require('./app/routerHandler')(app)


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: 'API working!'
    });
});


const port = process.env.PORT || 6969;

app.listen( port, () => {
    console.log(`Application is running on ${port}`);
});


