const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const panchangv2Schema = new mongoose.Schema({
    panchangv2_id: Number,
    panchang_thumbnail: String,
    panchang_title: String,
    panchang_time: String,
    slon: String,
	mlon: String,
	tithinum: String,
	tithi: String,
	paksha: String,
	tithiTill: String,
	nakshatra: String,
	nakshatraTill: String,
	yoga: String,
	karana: String,
	rashi: String,
    publish_date: String,
    update_date: String
});

panchangv2Schema.plugin(AutoIncrement, {id:'panchangv2_id',inc_field: 'panchangv2_id'});
module.exports = mongoose.model('panchangsv2s', panchangv2Schema);