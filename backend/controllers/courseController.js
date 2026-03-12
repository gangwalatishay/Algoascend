const courses = require('../data/courses');

function getAllCourses(req, res) {
    try {
        res.json(courses);
    } catch (error) {
        console.error('Get all courses error:', error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}

function getCourseById(req, res) {
    try {
        const { courseId } = req.params;
        const course = courses.find(c => c.courseId === courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        console.error('Get course by id error:', error);
        res.status(500).json({ error: 'Failed to fetch course' });
    }
}

module.exports = { getAllCourses, getCourseById };
