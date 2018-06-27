var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    EventName: {type: String, required: true},
    Description: {type: String, require: true},
    noOfperson: {type: Number},
    Image: {type: String},
    startDate: {type: Date , required: true},
    endDate: {type: Date, required: true}
});

module.exports = mongoose.model('event', eventSchema);