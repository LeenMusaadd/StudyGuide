const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');// Require to ckeck if the user log in, to routes it to admin pages
const mainController = require('../controllers/mainController');// Import the controller
const Course = require('../models/course');// Import the course schema
/**
 * App Routes
*/

// Route to home page
router.get('/', mainController.homepage); 
// Route to main page to view courses
router.get('/main', mainController.main);

// Route to add page
router.get('/add', isLoggedIn, mainController.add);

// Create new course then redirect to add page
router.post('/create', isLoggedIn, async (req, res) => {
    try {
      const { courseName, bookUrl, } = req.body;
  
      const newCourse = new Course({
        courseName,
        bookUrl,
      });
  
      await newCourse.save();
      res.redirect('/add');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

// Route to edit page
router.get('/update/:id', isLoggedIn, mainController.edit);
// Update course
router.put('/update/:id', isLoggedIn, mainController.update);
// Delete course
router.delete('/delete/:id', isLoggedIn, mainController.delete);

module.exports = router;