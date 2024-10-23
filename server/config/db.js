const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code if connection fails
  }
}
module.exports = connectDB;