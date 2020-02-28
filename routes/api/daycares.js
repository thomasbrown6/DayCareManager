const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Daycare = require("../../models/Daycare");
const Classroom = require("../../models/Classroom");
const User = require("../../models/User");

// @route   GET api/daycares
// @desc    Get all daycares
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const daycares = await Daycare.find().sort({ company: 1 });

    if (!daycares) {
      return res.status(400).json({ msg: "There are no daycares found" });
    }

    return res.status(200).json(daycares);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/daycares/me
// @desc    Get all users daycares
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const daycares = await Daycare.find({
      user: req.user.id
    })
      .sort({ company: 1 })
      .populate("user", ["name", "avatar"]);

    if (!daycares) {
      return res
        .status(400)
        .json({ msg: "There are no daycares for this user" });
    }

    return res.status(200).json(daycares);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/daycares/me/details
// @desc    Get top daycare expenses, student amount, details for daycare
// @access  Private
router.get("/me/details", auth, async (req, res) => {
  try {
    const daycares = await Daycare.find({
      user: req.user.id
    }).sort({ recentdate: -1 });

    if (!Array.isArray(daycares)) {
      return res.status(404).json({ msg: "no daycares found for user" });
    }

    const daycare = daycares[0];

    let students = [];
    if (Array.isArray(daycare.classrooms)) {
      daycare.classrooms.map(classroom => {
        if (Array.isArray(classroom.students)) {
          classroom.students.map(student => {
            students.push(student);
          });
        }
      });

      let totaltuition = 0;
      let totaldixonoveragecharges = 0;
      let totalparentfees = 0;
      let totalsubsidypayments = 0;
      let totaltotal = 0;

      if (Array.isArray(students)) {
        students.map(student => {
          totaltuition += student.dixontuition;
          totaldixonoveragecharges += student.dixonoveragecharge;
          totalparentfees += student.parentfee;
          totalsubsidypayments += student.subsidypayment;
          totaltotal += student.total;
        });
      }

      daycare.studentcount = students.length;
      daycare.totaltuition = totaltuition;
      daycare.totaldixonoveragecharges = totaldixonoveragecharges;
      daycare.totalparentfees = totalparentfees;
      daycare.totalsubsidypayments = totalsubsidypayments;
      daycare.totaltotal = totaltotal;

      await daycare.save();
    }
    return res.status(200).json(daycares);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/daycares/:id
// @desc    Get daycare by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const daycare = await Daycare.findById(req.params.id);
    if (!daycare) {
      return res.status(404).json({ msg: "daycare not found" });
    }

    return res.status(200).json(daycare);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "daycare not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/daycares
// @desc    Create a daycare
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("company", "Company name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { company, website, location } = req.body;

      const daycareFields = {};
      daycareFields.user = req.user.id;

      if (company) daycareFields.company = company;
      if (website) daycareFields.website = website;
      if (location) daycareFields.location = location;

      //let daycare = await Daycare.findOne({ })

      const daycare = new Daycare(daycareFields);
      await daycare.save();

      return res.status(200).json(daycare);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/daycares/:daycare_id
// @desc    Delete daycare by id
// @access  Private
router.delete("/:daycare_id", auth, async (req, res) => {
  try {
    const daycare = await Daycare.findById(req.params.daycare_id);

    if (!daycare) {
      return res.status(404).json({ msg: "Daycare not found" });
    }

    // Check that user deleting the daycare created it
    if (daycare.user.toString() !== req.user.id) {
      return res.status(401).json("User is not authorized to delete daycare");
    }

    await daycare.remove();
    res.status(200).json("Daycare removed");
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Daycare not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
