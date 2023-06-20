const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const musicSchema = new mongoose.Schema({
            music_id: Number,
            music_title: String,
            music_category: String,
            music_subcategory: String,
            music_url: String,
            music_key: String,
            music_path: String,
            music_duration: String,
            music_publisher: String,
            update_date: String,        
});

musicSchema.plugin(AutoIncrement, {id:'music_id',inc_field: 'music_id'});
module.exports = mongoose.model('musics', musicSchema);