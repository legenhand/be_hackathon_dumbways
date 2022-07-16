const express = require('express');
require('dotenv').config();
const cors = require('cors');
// Get routes to the variabel
const router = require('./src/routes');
// import here

const app = express();

let corsOptions = {
    origin: '*',
};

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));
// Add endpoint grouping and router
app.use('/api/v1/', router);

app.use('/', (req, res) => {
    res.send({
        status: "online",
        message: "Server Is Online!"
    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`));