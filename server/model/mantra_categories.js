const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const mantracategoriesSchema = new mongoose.Schema({
            mantra_categories_id: Number,
            mantras_categories_title: String,
            mantra_category_Id: String,
            mantras_categories_thumbnail: String,
            update_date: String,     
});

mantracategoriesSchema.plugin(AutoIncrement, {id:'mantra_categories_id',inc_field: 'mantra_categories_id'});
module.exports = mongoose.model('mantras_categories', mantracategoriesSchema);