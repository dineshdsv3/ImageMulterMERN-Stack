const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
	productImage: { type: String, required: true },
});

module.exports = mongoose.model('super', imageSchema);
