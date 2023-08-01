const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const watchedSchema = new mongoose.Schema({
    v_id: Number,
    username: String,
    video_key: String,
    update_date: String,
});

watchedSchema.plugin(AutoIncrement, {id:'v_id',inc_field: 'v_id'});
module.exports = mongoose.model('watchedVideos', watchedSchema);