// /config/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vmro45:Vmro45%407856@coddunity.kyll8.mongodb.net/jogisuperstore', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
