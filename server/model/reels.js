const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const reelSchema = new mongoose.Schema({
    reels_id: Number,
    reels_name: String,
    reels_summary: String,
    reels_path: String,
    reels_thumbnail: String,
    reels_code: String,
    reels_category: String,
    update_date: String,
});

reelSchema.plugin(AutoIncrement, {id:'reels_ids',inc_field: 'reels_id'});
module.exports = mongoose.model('reels', reelSchema);