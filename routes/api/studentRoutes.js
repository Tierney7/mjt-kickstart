const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/ThoughtController');

// /api/students
router.route('/').get(getSingleThought).post(createThought);

// /api/students/:studentId
router.route('/:ThoughtId').get(getSingleThought).delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:ThoughtId/reaction').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
