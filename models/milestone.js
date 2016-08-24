var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var milestoneSchema = new Schema ({
  name: String,
  value: Number,
  milestoneGoal: Number,
})

var Milestone = mongoose.model('Milestone', milestoneSchema);

var exportObj = {};


exportObj.model = Milestone;
exportObj.schema = milestoneSchema;

module.exports = exportObj;
