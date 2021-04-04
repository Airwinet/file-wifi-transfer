const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require("dotenv")

dotenv.config()

const app = express();

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 100 * 1024 * 1024 * 1024 // max 100 MB size of file
    },
}));

app.use(cors());
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);

