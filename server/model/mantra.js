const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const mantraSchema = new mongoose.Schema({
            mantra_id: Number,
            mantra_title: String,
            mantra_path: String,
            mantra_url: String,
            mantra_key: String,
            mantra_category: String,
            mantra_sloak: String,
            mantra_thumbnail: String,
            mantra_duration: String,
            mantra_publish: String,
            update_date: String,     
});

mantraSchema.plugin(AutoIncrement, {id:'mantra_ids',inc_field: 'mantra_ids'});
module.exports = mongoose.model('mantras', mantraSchema);