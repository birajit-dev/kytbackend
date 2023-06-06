const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const wishesSchema = new mongoose.Schema({
            wishes_id: Number,
            wishes_thumbnail: String,
            wishes_url: String,
            wishes_publish: String,
            update_date: String,
});

wishesSchema.plugin(AutoIncrement, {id:'wishes_id',inc_field: 'wishes_id'});
module.exports = mongoose.model('wishes', wishesSchema);