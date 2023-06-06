const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const musicSchema = new mongoose.Schema({
            music_id: Number,
            music_title: String,
            music_description: String,
            music_category: String,
            music_subcategory: String,
            music_url: String,
            music_path: String,
            music_keyword: String,
            //music_locate: String,         
            music_thumbnail: String,
            music_publisher: String,
            music_publish: String,
            update_date: String,        
});

musicSchema.plugin(AutoIncrement, {id:'music_id',inc_field: 'music_id'});
module.exports = mongoose.model('musics', musicSchema);