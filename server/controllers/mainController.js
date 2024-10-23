
/**
 GET course from DB
 */
 const Course = require('../models/course');

 module.exports = {

  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find(); // Fetch all courses from DB
      const locals = {
        title: "Courses - Study Guide",
        description: "Study Guide App."
      };
      console.log('Fetched Courses:', courses);
      // Pass the courses and locals to the view
      res.render("main.ejs", { courses : courses, locals }); 
    } catch (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send('Internal Server Error');
    }
  },
 
   // Home page controller
   homepage: async (req, res) => {
     const locals = {
       title: "Courses - Study Guide",
       description: "Study Guide App."
     };
     res.render('index', locals);
   },

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

index: async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the current page from query parameters
  const limit = 5; // Set the number of courses per page
  const skip = (page - 1) * limit; // Calculate how many courses to skip

  try {
    const totalCourse = await Course.countDocuments(); // Get total number of course
    const courses = await Course.find({}).skip(skip).limit(limit); // Fetch course for the current page
    const totalPages = Math.ceil(totalCourse / limit); // Calculate total pages

    res.render('add', {
      courses: courses,
      currentPage: page,
      totalPages,
      layout: '../views/layouts/admin'
    });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Internal Server Error');
  }
},
   // Add page - Fetch and pass courses to the view
add: async (req, res) => {
  const locals = {
    title: "Courses - Study Guide",
    description: "Study Guide App."
  };

  try {
    // Fetch all courses
    const courses = await Course.find({});
    res.render('add', { locals, courses, layout: '../views/layouts/admin' }); // Pass courses to the view
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Internal Server Error');
  }
},

  //edit course
  edit: async (req, res) => {
    const id = req.params.id;
    try {
      const course = await Course.findById(id); // Retrieve the specific Course
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
  //update course
  update: async (req, res) => {
    const id = req.params.id;
    const { courseName, bookUrl } = req.body;
  
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
  //delete course
  delete: async (req, res) => {
    try {
      const result = await Course.deleteOne({ _id: req.params.id });
      res.redirect("/add");
    } catch (error) {
      console.log(`There was an error: ${error}`);
      res.status(500).send('Internal Server Error');
    }
  }
 };

