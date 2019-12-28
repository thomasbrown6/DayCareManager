const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Classroom = require('../../models/Classroom');
const Daycare = require('../../models/Daycare');
const User = require('../../models/User');

// @route   GET /api/classrooms/daycare/:id
// @desc    Get all classrooms for daycare
// @access  Private
router.get('/daycare/:id', auth, async (req, res) => {
  try {
    const classrooms = await Classroom.find({
      daycare: req.params.id,
      user: req.user.id
    }).sort({ title: 1 });

    if (!classrooms || classrooms.length == 0) {
      return res
        .status(400)
        .json({ msg: 'There are no classrooms for this user' });
    }

    return res.status(200).json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/classrooms/daycare/:id/students
// @desc    Get all students for daycare
// @access  Private
router.get('/daycare/:id/students', auth, async (req, res) => {
  try {
    const classrooms = await Classroom.find({
      daycare: req.params.id,
      user: req.user.id
    }).sort({ title: 1 });

    if (!classrooms || classrooms.length == 0) {
      return res
        .status(400)
        .json({ msg: 'There are no classrooms for this user' });
    }

    let students;
    students = classrooms.map(classes => {
      if (classes.students != null && classes.students.length > 0) {
        students = classes.students;
      }
    });

    console.log(students);
    if (students === null) {
      students = { msg: 'no students in daycare' };
    }

    return res.status(200).json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/classrooms/daycare/:daycare_id
// @desc    Create a classroom for daycare
// @access  Private
router.post(
  '/daycare/:daycare_id',
  [
    auth,
    [
      check('title', 'Have to have a name for classroom ')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const daycare = await Daycare.findById(req.params.daycare_id);

      if (!daycare) {
        return res.status(404).json({ msg: 'Daycare not found' });
      }

      console.log('got daycare');

      const newClassroom = new Classroom({
        user: req.user.id,
        daycare: req.params.daycare_id,
        title: req.body.title,
        description: req.body.description
      });

      await newClassroom.save();
      return res.status(200).json(newClassroom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/classrooms/:daycare_id
// @desc    Get all classrooms for daycare
// @access  Private
router.get('/:daycare_id', auth, async (req, res) => {
  try {
    const classrooms = await Classroom.find({ daycare: req.params.daycare_id });

    if (!classrooms) {
      return res
        .status(400)
        .json({ msg: 'Did not get any classrooms for daycare' });
    }

    return res.status(200).json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/classrooms/:id
// @desc    Get classroom
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(400).json({ msg: 'Did not find classroom' });
    }

    await Classroom.findOneAndRemove({ _id: classroom.id });

    return res.status(200).json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/classrooms/student/:id
// @desc    Create a student for classroom
// @access  Private
router.post(
  '/student/:id',
  [
    auth,
    [
      check('firstname', 'Have to have a first name for student')
        .not()
        .isEmpty(),
      check('lastname', 'Have to have a last name for student')
        .not()
        .isEmpty(),
      check('parents', 'Have to have a parent for child')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.id);

      if (!classroom) {
        return res.status(404).json({ msg: 'Classroom not found' });
      }

      console.log('got daycare');

      const newClassroom = new Classroom({
        user: req.user.id,
        daycare: req.params.daycare_id,
        title: req.body.title,
        description: req.body.description
      });

      await newClassroom.save();
      return res.status(200).json(newClassroom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
