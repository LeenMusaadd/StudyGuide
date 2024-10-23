/**
 GET course from DB
 */
 const Course = require('../models/course');

 module.exports = {
   // Home page controller
   homepage: async (req, res) => {
     const locals = {
       title: "Courses - Study Guide",
       description: "Study Guide App."
     };
     res.render('index', locals);
   },
   // Main page controller - Fetch and pass courses to the main view
   main: async (req, res) => {
     const locals = {
       title: "Courses - Study Guide",
       description: "Study Guide App."
     };
       
     try {
       // Fetch all courses from the database
       const courses = await Course.find({});
       // Pass courses to the view
       res.render('main', { locals, courses });
     } catch (err) {
         console.error('Error fetching courses:', err);
         res.status(500).send('Internal Server Error');
     }
   },
 
 
   // Add page - Fetch and pass courses to the add view
   add: async (req, res) => {
     const locals = {
       title: "Courses - Study Guide",
       description: "Study Guide App."
     };
 
     try {
       // Fetch all courses
       const courses = await Course.find({});
       // Pass courses to the view
       res.render('add', { locals, courses, layout: '../views/layouts/admin' }); // Pass courses to the view
     } catch (err) {
       console.error('Error fetching courses:', err);
       res.status(500).send('Internal Server Error');
     }
   },
 
   //Edit page - Fetch and pass courses to the edit view
   edit: async (req, res) => {
     const id = req.params.id;
     try {
       const course = await Course.findById(id); // Retrieve the specific Course to be update
       const courses = await Course.find({}); // Fetch all Courses
       if (!course) {
         return res.status(404).send('Course not found');
       }
       res.render("addEdit.ejs", { course, courses: courses, layout: '../views/layouts/admin' }); // Pass both course and courses array
     } catch (err) {
       console.error('Error fetching course:', err); 
       res.status(500).send('Internal Server Error');
     }
   },
 
   //Update course then redirect to add page
   update: async (req, res) => {
     const id = req.params.id;// Get course id to update
     const { courseName, bookUrl } = req.body;// Get updated courseName and bookUrl
     try {
       // Find the course by ID and update its courseName and bookUrl
       const updatedCourse = await Course.findByIdAndUpdate(
         id, 
         { 
           courseName: courseName, 
           bookUrl: bookUrl
         }, 
         { new: true, runValidators: true }
       );
     
       if (!updatedCourse) {
         return res.status(404).send('Course not found');
       }
     
       return res.redirect("/add");
     } catch (err) {
       console.error('Error updating course:', err);
       res.status(500).send('Internal Server Error');
     }
   },
 
   //Delete course then redirect to add page
   delete: async (req, res) => {
     try {
       const result = await Course.deleteOne({ _id: req.params.id });// Delete the course by its ID using "deleteOne"
       res.redirect("/add");
     } catch (error) {
       console.log(`There was an error: ${error}`);
       res.status(500).send('Internal Server Error');
     }
   }
 };