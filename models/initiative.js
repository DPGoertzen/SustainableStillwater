var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var phase = require('./phase').schema;

var initiativeSchema = new Schema ({
  pillar: Number,
  name: String,
  contactName: String,
  contactPhone: Number,
  contactEmail: String,
  objectives: String,
  image: String,
  website: String,
  otherData: String,
  approved: Boolean,
  phase: [phase]
});

var Initiative = mongoose.model('Initiative', initiativeSchema);

var exportObj = {};

exportObj.model = Initiative;
exportObj.schema = initiativeSchema;

module.exports = exportObj
