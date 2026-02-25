const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const app = require('./src/app')

dotenv.config();
connectDB();

const PORT = process.env.PORT || 9000;

app.listen(9000, () => {
    console.log(`Server running on port 9000`);
})