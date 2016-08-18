var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var kpi = require('./kpi').schema;

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
  kpi: [kpi]
});

var Initiative = mongoose.model('Initiative', initiativeSchema);

var exportObj = {};

exportObj.model = Initiative;
exportObj.schema = initiativeSchema;

module.exports = exportObj
