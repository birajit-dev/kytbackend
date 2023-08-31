const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const stateSchema = new mongoose.Schema({
            state_id: Number,
            state_code: String,
            state_name: String,
            state_thumbnail: String,
            update_date: String,
});

stateSchema.plugin(AutoIncrement, {id:'state_id',inc_field: 'state_id'});
module.exports = mongoose.model('state_lists', stateSchema);