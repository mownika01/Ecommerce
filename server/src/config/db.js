const moongose = require('mongoose')

const connectDB = async () => {
    try {
    const connection = await moongose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch(err) {
    console.log(err.message);
    process.exit(1);
    }
}

module.exports = connectDB;