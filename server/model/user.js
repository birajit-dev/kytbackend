const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    users_id: Number,
    username: String,
    phone_no: Number,
    phone_otp: String,
    otp_session: String,
    update_date: String,
});

userSchema.plugin(AutoIncrement, {id:'users_id',inc_field: 'users_id'});
module.exports = mongoose.model('users', userSchema);