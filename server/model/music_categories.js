const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const musiccategoriesSchema = new mongoose.Schema({
            music_categories_id: Number,
            mcategories_name: String,
            mcategories_thumbnail: String,
            mcategories_keywrods: String,
            mcategories_descriptions: String,
            update_date: String,
                
});

musiccategoriesSchema.plugin(AutoIncrement, {id:'music_categories_id',inc_field: 'music_categories_id'});
module.exports = mongoose.model('musiccategories', musiccategoriesSchema);