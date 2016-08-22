var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var milestone = require('./milestone').schema;

var phaseSchema = new Schema ({
  label: String,
  phaseValue: Number,
  milestones: [milestone]
});

var Phase = mongoose.model('Phase', phaseSchema);

var exportObj = {};

exportObj.model = Phase;
exportObj.schema = phaseSchema;

module.exports = exportObj;
