const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const blogsSchema = new mongoose.Schema({
            blogs_id: Number,
            title: String,
            url: String,
            description: String,
            thumbnail: String,
            category: String,
            keyword: String,
            update_date: String, 
});

blogsSchema.plugin(AutoIncrement, {id:'blogs_id',inc_field: 'blogs_id'});
module.exports = mongoose.model('articles', blogsSchema);