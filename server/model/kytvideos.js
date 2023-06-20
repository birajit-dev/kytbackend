const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const videosSchema = new mongoose.Schema({
            videos_id: Number,
            videos_title: String,
            videos_description: String,
            videos_category: String,
            videos_sub_category: String,
            videos_url: String,
            videos_path: String,
            videos_key: String,
            videos_keyword: String,
            videos_temple_locate: String,         
            videos_thumbnail: String,
            videos_publisher: String,
            videos_publish: String,
            videos_duration: String,
            update_date: String,        
});

videosSchema.plugin(AutoIncrement, {id:'videos_id',inc_field: 'videos_id'});
module.exports = mongoose.model('kyvideos', videosSchema);