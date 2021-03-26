const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://vinaykumar1480:admin123@cluster0.jletd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    });
    console.log(`${conn.connection.host}`);
};

module.exports = connectDB;