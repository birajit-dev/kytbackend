const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const vcategoriesSchema = new mongoose.Schema({
            v_categories_id: Number,
            vcategories_name: String,
            vcategories_thumbnail: String,
            vcategories_keywrods: String,
            vcategories_descriptions: String,
            update_date: String,
                
});

vcategoriesSchema.plugin(AutoIncrement, {id:'v_categories_id',inc_field: 'v_categories_id'});
module.exports = mongoose.model('vcategories', vcategoriesSchema);