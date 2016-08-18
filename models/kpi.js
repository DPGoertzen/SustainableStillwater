var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kpiSchema = new Schema ({
  label: String,
  goal: Number || Boolean
});

var KPI = mongoose.model('KPI', kpiSchema);

var exportObj = {};

exportObj.model = KPI;
exportObj.schema = kpiSchema;

module.exports = exportObj;
