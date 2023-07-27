const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const pujaSchema = new mongoose.Schema({
    p_temples_ids: Number,
    temple_name: String,
    summary: String,
    address: String,
    puja_timing: String,
    puja_temple_code: String,
    puja_services: [
        {
            package_name: String,
            package_price: String,
            package_discount_price: String,
            package_details: String,
            package_service_code: String,
        }
    ],
    update_date: String,
});



pujaSchema.plugin(AutoIncrement, {id:'p_temples_ids',inc_field: 'p_temples_id'});
module.exports = mongoose.model('pujatemples', pujaSchema);