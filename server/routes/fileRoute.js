const express = require('express');
const fileController = require('../controllers/fileController.js'); // Adjust the path as needed
const { validateToken } = require('../controllers/jwtController.js');

const router = express.Router();

// Use body-parser middleware
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/upload', validateToken, fileController.uploadFile);
router.get('/files', fileController.getFiles);
router.get('/:filename', fileController.getFileByName);

module.exports = router;