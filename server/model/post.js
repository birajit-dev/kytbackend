const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const articleSchema = new mongoose.Schema({
            article_id: Number,
            article_title: String,
            article_thumbnail: String,
            article_link: String,
            update_date: String,
});

articleSchema.plugin(AutoIncrement, {id:'article_id',inc_field: 'article_id'});
module.exports = mongoose.model('trendingposts', articleSchema);