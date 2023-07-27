const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const loveMantraSchema = new mongoose.Schema({
            lovem_id: Number,
            username: String,
            mantra_key: String,
            update_date: String,  
});

loveMantraSchema.plugin(AutoIncrement, {id:'lovem_id',inc_field: 'lovem_ids'});
module.exports = mongoose.model('lovemantra', loveMantraSchema);