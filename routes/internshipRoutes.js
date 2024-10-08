const express = require('express');
const multer = require('multer');
const { createApplication, getApplication, getAllApplications } = require('../controllers/internshipController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Use multer to handle file uploads

// Route to create a new internship application
router.post('/internshipApplications', upload.single('cv'), createApplication);

// Route to get a specific internship application by ID
router.get('/internshipApplications/:id', getApplication);

// Route to get a all internship application by ID

router.get('/internshipApplications', getAllApplications);



module.exports = router;
