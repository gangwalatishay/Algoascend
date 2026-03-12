const express = require('express');
const { getAllCourses, getCourseById } = require('../controllers/courseController');

const router = express.Router();

router.get('/api/courses', getAllCourses);
router.get('/api/courses/:courseId', getCourseById);

module.exports = router;
