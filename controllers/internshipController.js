const cloudinary = require('cloudinary').v2;
const InternshipApplication = require('../models/InternshipApplication');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createApplication = async (req, res) => {
    try {
        const { name, city, mobile, email, techSkills, mode, education } = req.body;
        let cvUrl = '';

        // Upload CV to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'internship_cvs'
            });
            cvUrl = result.secure_url; // Store the secure URL
        }

        // Create a new internship application
        const application = new InternshipApplication({
            name: name.toUpperCase(),
            city: city.toUpperCase(),
            mobile,
            email: email.toUpperCase(),
            techSkills: techSkills.toUpperCase(),
            mode: mode.toUpperCase(),
            education: education.toUpperCase(),
            cv: cvUrl
        });

        // Save application to MongoDB
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Failed to submit application. Please try again.' });
    }
};

const getApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const application = await InternshipApplication.findById(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ message: 'Failed to fetch application' });
    }
};


const getAllApplications = async (req, res) => {
  try {
      // Fetch all internship applications from MongoDB
      const applications = await InternshipApplication.find();
      res.json(applications);
  } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

module.exports = {
    createApplication,
    getApplication,
    getAllApplications 

};
