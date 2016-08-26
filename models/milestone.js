var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var milestoneSchema = new Schema ({
  name: String,
  milestoneGoal: String,
  measurement: String,
  startingPoint: Number
})

var Milestone = mongoose.model('Milestone', milestoneSchema);

var exportObj = {};


exportObj.model = Milestone;
exportObj.schema = milestoneSchema;

module.exports = exportObj;
