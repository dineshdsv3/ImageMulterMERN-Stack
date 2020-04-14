const mongoose = require('mongoose')
const MONGODB_URL = 'mongodb+srv://dineshdsv3:Satya@14@cluster0-kvunt.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})