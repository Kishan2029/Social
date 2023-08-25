
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(
            process.env.MONGODB_URL,
            {
                useNewUrlParser: true,
                // useFindAndModify: false,
                useUnifiedTopology: true
            }
        );
        console.log("Social Media Database Connected....");
    } catch (err) {
        console.error(err.message);
        // Exit Process with failure
        process.exit(1);
    }

}

module.exports = connectDB;
