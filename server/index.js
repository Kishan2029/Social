const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
const route = require("./routes/routes");
const { errorHandler, logger, checkAuth } = require('./middleware/index');

const connectDB = require('./config/db');


// Cors Setup
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true }));

const PORT = process.env.PORT || 8000;


connectDB();



app.get('/', (req, res) => {
    res.send('Server is working')
})

app.get('/test', (req, res) => {

    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
        cloud_name: 'do9w4fypf',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Blairmorite_from_the_Crowsnest_Formation.jpg/1000px-Blairmorite_from_the_Crowsnest_Formation.jpg",
        { public_id: "test" },
        function (error, result) { console.log(result); });
    res.send('Server is working')
})

app.use(logger);

// app.use(checkAuth);

route(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`[listen] Server listening on ${PORT}`);
});


