const mongoose= require('mongoose');
/* 
Schema for course collection
each course has two values, course name and book Url
*/
const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    bookUrl: { type: String, required: true }
});

module.exports=mongoose.model('Course',courseSchema, 'courses');