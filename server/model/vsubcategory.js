const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const vsubcategorySchema = new mongoose.Schema({
            sub_category_id: Number,
            parentCategory: String,
            subcategory_title: String,
            subcategory_Id: String,
            subcategory_thumbnail: String,
            update_date: String,      
});

vsubcategorySchema.plugin(AutoIncrement, {id:'sub_category_id',inc_field: 'sub_category_id'});
module.exports = mongoose.model('vsubcategory', vsubcategorySchema);