const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        courseId: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String },
        features: [{ type: String }],
        demoVideo: { type: String },
        description: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
