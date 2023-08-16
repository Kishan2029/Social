const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const route = require("./routes/routes")

// Cors Setup
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 8000;



app.get('/', (req, res) => {
    res.send('Server is working')
})

route(app);


app.listen(PORT, () => {
    console.log(`[listen] Server listening on ${PORT}`);
});


