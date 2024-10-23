const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const mainController = require('../controllers/mainController');
const Course = require('../models/course');
/**
 * App Routes
*/
router.get('/', mainController.homepage); 
router.get('/main', mainController.main);
router.get('/main', mainController.getAllCourses); 

router.get('/add', isLoggedIn, mainController.add);

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
  
// Find all course with pagination
router.get('/add', isLoggedIn, mainController.index); // This will now handle pagination

// Update course
router.get('/update/:id', isLoggedIn, mainController.edit);
router.put('/update/:id', isLoggedIn, mainController.update);

// Delete course
router.delete('/delete/:id', isLoggedIn, mainController.delete);
module.exports = router;