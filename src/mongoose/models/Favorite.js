const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
      collectionId : [{ type : Number }]
});

module.exports = mongoose.model('Favorite', favoriteSchema);