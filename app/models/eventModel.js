var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    EventName: {type: String, required: true},
    EventDescription: {type: String, require: true},
    EventPerson: {type: Number},
    EventImage: {type: String},
    EventRange: {type: Array}
    //EventRange: {type: Date, required: true},
    // Image: {type:,}
});

module.exports = mongoose.model('event', eventSchema);