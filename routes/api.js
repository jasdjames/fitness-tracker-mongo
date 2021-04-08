// 4 routes - Look at the fetch routes
// get Last workout (just one workout - id last) - update/PUT (add exercises) - POST (create workout)  - get Workouts In Range (get where datetime (?-?))

const router = require('express').Router();
const Workout = require('../models/Workout');

Router.get('/api/workouts', (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// the fetch had +id?
router.put('/api/workouts/:id', ({ body }, res) => {
  Workout.findOneAndUpdate(req.body.id)
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('api/workouts/range', (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
