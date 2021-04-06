const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: String,
  type: String,
  //   duration:
});

const Book = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
