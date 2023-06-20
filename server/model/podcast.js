const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const podcastSchema = new mongoose.Schema({
    podcast_id: Number,
    podcast_title: String,
    podcast_description: String,
    podcast_url: String,
    podcast_category: String,
    podcast_path: String,
    podcast_key: String,
    podcast_thumbnail: String,
    podcast_duration: String,
    update_date: String,
});

podcastSchema.plugin(AutoIncrement, {id:'podcast_id',inc_field: 'podcast_id'});
module.exports = mongoose.model('podcasts', podcastSchema);