const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const panchangSchema = new mongoose.Schema({
    panchang_id: Number,
    panchang_thumbnail: String,
    panchang_title: String,
    panchang_time: String,
    festival_description: String,
    sunrise: String,
    sunset: String,
    moonrise: String,
    moonset: String,
    panchang_date: String,
    nakshatra: String,
    yoga: String,
    karana: String,
    month_amanta: String,
    month_purnimanta: String,
    vikram_samvat: String,
    shaka_samvat: String,
    sun_sign: String,
    moon_sign: String,
    sishashool: String,
    moon_placement: String,
    season: String,
    ayana: String,
    publish_date: String,
    update_date: String
});

panchangSchema.plugin(AutoIncrement, {id:'panchang_id',inc_field: 'panchang_id'});
module.exports = mongoose.model('panchangs', panchangSchema);