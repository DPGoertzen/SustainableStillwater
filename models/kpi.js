var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kpiSchema = new Schema ({
  label: String,
  milestone: String,
  progress: Number
});

var KPI = mongoose.model('KPI', kpiSchema);

var exportObj = {};

exportObj.model = KPI;
exportObj.schema = kpiSchema;

module.exports = exportObj;
