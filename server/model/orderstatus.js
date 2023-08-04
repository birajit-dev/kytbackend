const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
            order_id: Number,
            order_user_id: String,
            order_user_phone: String,
            package_service_code: String,
            order_amount: String,
            razorpay_order_id: String,
            razorpay_payment_id: String,
            payment_status: String,
            payment_description: String,
            payment_date: String,
            update_date: String,        
});

orderSchema.plugin(AutoIncrement, {id:'orders_ids',inc_field: 'orders_id'});
module.exports = mongoose.model('orderstatus', orderSchema);