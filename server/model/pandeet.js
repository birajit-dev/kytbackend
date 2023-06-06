const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const pandeetSchema = new mongoose.Schema({
    pandeet_id: Number,
    pandeet_name: String,
    pandeet_email: String,
    pandeet_phone: String,
    pandeet_address: String,
    pandeet_bio: String,
    update_date: String,
});

pandeetSchema.plugin(AutoIncrement, {id:'pandeet_id',inc_field: 'pandeet_id'});
module.exports = mongoose.model('pandeets', pandeetSchema);