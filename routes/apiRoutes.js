// 4 routes - Look at the fetch routes
// get Last workout (just one workout - id last) - update/PUT (add exercises) - POST (create workout)  - get Workouts In Range (get where datetime (?-?))

const router = require('express').Router();
const Workout = require('../models/Workout');
const path = require('path');

router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ day: -1 })
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'exercise.html'));
});

router.post('/api/workouts', ({ body }, res) => {
  console.log('We hit the route!!');
  Workout.create({ body })
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// the fetch had +id?
router.put('/api/workouts/:id', (req, res) => {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .limit(10)
    .then((lastWorkout) => {
      res.json(lastWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'stats.html'));
});
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
