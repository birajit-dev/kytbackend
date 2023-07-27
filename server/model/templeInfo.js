const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const templesSchema = new mongoose.Schema({
    temple_id: Number,
    name: String,
    summary: String,
    address: String,
    latitude: Number,
    longitude: Number,
    about: String,
    temple_status: Boolean,
    temple_cover_photo: String,
    temple_round_photo: String,
    temple_phone: Number,
    temple_code: String,
    temple_timings: [
      {
        day: String,
        timings: String,
      }
    ],
    coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: [Number], // [longitude, latitude]
      },
    update_date: String,
});



templesSchema.plugin(AutoIncrement, {id:'temple_id',inc_field: 'temple_id'});
module.exports = mongoose.model('temples', templesSchema);