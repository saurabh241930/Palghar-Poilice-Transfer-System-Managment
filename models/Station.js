var mongoose = require('mongoose');


var StationSchema = new mongoose.Schema({



}, {
  usePushEach: true
});



module.exports = mongoose.model("Station", StationSchema);