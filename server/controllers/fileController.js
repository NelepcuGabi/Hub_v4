const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const mongoURI = 'mongodb://127.0.0.1:27017/authentication';

// Create mongo connection
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfsBucket;
client.connect().then(() => {
    const db = client.db('authentication');
    gfsBucket = new GridFSBucket(db, {
        bucketName: 'uploads'
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        if (!req.user || !req.user._id) {
            throw new Error('User not authenticated');
        }
        return {
            bucketName: 'uploads', // Collection name in MongoDB
            filename: `${Date.now()}-${file.originalname}`,
            metadata: {
                title: req.body.title,
                description: req.body.description,
                userId: req.user._id
            }
        };
    }
});

const upload = multer({ storage });

exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err); // Log error details
            return res.status(500).json({ error: 'An error occurred while uploading the file' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file was uploaded' });
        }

        console.log('Uploaded file:', req.file); // Log file details for debugging
        return res.status(201).json({ message: 'File uploaded successfully', file: req.file });
    });
};

exports.getFiles = async (req, res) => {
    try {
        const files = await gfsBucket.find().toArray();
        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files available' });
        }
        res.status(200).json(files);
    } catch (err) {
        console.error('Error retrieving files:', err);
        res.status(500).json({ error: 'An error occurred while retrieving files' });
    }
};

exports.getFileByName = async (req, res) => {
    const { filename } = req.params;

    if (!gfsBucket) {
        return res.status(500).json({ error: 'GridFSBucket is not initialized' });
    }

    try {
        const files = await gfsBucket.find({ filename }).toArray();
        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const file = files[0];
        const readstream = gfsBucket.openDownloadStream(file._id);

        res.setHeader('Content-Type', file.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);

        readstream.on('error', (err) => {
            res.status(500).json({ error: 'An error occurred while streaming the file' });
        });

        readstream.pipe(res);
    } catch (err) {
        console.error('Error finding file:', err);
        res.status(500).json({ error: 'An error occurred while retrieving the file' });
    }
};
