const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const testSchema = new mongoose.Schema({
    test_id: Number,
    name: String,
    fname: String,
    english:{
        pt1:{
            type: String,
        },
        nb1:{
            type: String,
        }
    }

});

testSchema.plugin(AutoIncrement, {id:'test_id',inc_field: 'test_id'});
module.exports = mongoose.model('birnews', testSchema);