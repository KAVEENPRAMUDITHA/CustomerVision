const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/consumer_complaints';

console.log('Testing connection to:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB!');
        process.exit(0);
    })
    .catch(err => {
        console.error('ERROR: Could not connect to MongoDB.');
        console.error(err.message);
        process.exit(1);
    });
