const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const horoscopeSchema = new mongoose.Schema({
            horoscope_id: Number,
            horoscope_title: String,
            horoscope_description: String,
            horoscope_url: String,
            horoscope_category: String,
            horoscope_thumbnail: String,
            horoscope_date: String,
            horoscope_keyword: String,
            hrooscope_publish: String,
            update_date: String, 
});

horoscopeSchema.plugin(AutoIncrement, {id:'mantra_id',inc_field: 'mantra_id'});
module.exports = mongoose.model('horoscopes', horoscopeSchema);