const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const multer = require('multer'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser')

const User = require('./models/userDetails');
const News = require('./models/NewsStore');
const FileModel = require('./models/UploadFiles');
const FileStorage = require('./models/FileStorage');
const ImageModel = require('./models/ImageModel');
const verifyUser = require('./models/VerifyData');

const SECRET_KEY = 'super-secret-key'

// connect to express app
const app = express()

// connect to mongoDB
const dbURI = 'mongodb+srv://nandhakumar:vasavi1977@materialhandling.my1we4r.mongodb.net/UsersDB?retryWrites=true&w=majority'
mongoose
  .connect(dbURI)
  .then(() => {
    // Start the server after a successful connection
    app.listen(3001, () => {
      console.log('Server connected to MongoDB');
      console.log('Server Running on http://localhost:3001');
    });
  })
  .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB', error);
  });


// middleware
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000', 
}))
// app.use(cookieParser());
const path = require('path');
const fs = require('fs');

// Multer storage configuration

//const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({ storage: storage });

//Routes

// const usersData = [
//   {
//       "securityKey": "Mec4216",
//       "role": "admin"
//   },
//   {
//       "enrollNumber": "210697",
//       "username": "Nandhakumar",
//       "role": "user"
//   },
//   {
//       "enrollNumber": "220643",
//       "username": "Mohandass",
//       "role": "user"
//   }
// ];

// // Insert the data into the collection
// verifyUser.insertMany(usersData)
//   .then(() => {
//       console.log('Data inserted successfully.');
//   })
//   .catch(err => {
//       console.error('Error inserting data:', err);
//   });
// REGISTER

// Verify user route
app.post('/verify', async (req, res) => {
  const { userData } = req.body;
  console.log(userData)
  try {
    let role;

    if (userData === "Mec4216") {
      role = "admin";
    } else {
      const userByEnrollNumber = await verifyUser.findOne({ enrollNumber: userData });
      if (userByEnrollNumber) {
        role = "user";
      }
    }
    
    
    if (role) {
      res.json({ isVerified: true, role: role });
      console.log("Role:",role);
    } else {
      res.status(401).json({ isVerified: false });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//POST REGISTER
app.post('/register', async (req, res) => {
    try {
        const { username, department, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, department, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error signing up' });
    }
})

//GET Registered Users
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
        
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' })
    }
})

//LOGIN

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Password comparison error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (result) {
        // Passwords match, generate JWT token
        const token = jwt.sign({ email: user.email, username: user.username, role: user.role, department: user.department }, SECRET_KEY, { expiresIn: '1h' });
        // Send token and user information
        res.json({ token, user: { username: user.username, department: user.department, role: user.role },data: token });
      } else {
        // Passwords don't match
        res.status(401).json({ message: 'Incorrect password' });
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Handle file upload endpoint

app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
      const { filename, subject, department, semester, unit } = req.body;
      const newfile = new FileModel({ filename, subject, department, semester, unit });
      await newfile.save();
      const fileStorage = new FileStorage({ filetitle: req.file.originalname, file_url: req.file.path });
      await fileStorage.save();
      res.status(201).send('File uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});

// Retrieve file information endpoint

app.get('/files', async (req, res) => {
    try {
      const files = await FileModel.find().populate('fileStorage');
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});
  

// Endpoint to serve files for download
app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'files', fileName);

    // Set Content-Disposition header to force download
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

    // Send the file
    res.sendFile(filePath);
});

// Serve static files from the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));

// View PDF route
app.get('/viewpdf/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'files', fileName);
  
  // Send the PDF file
  res.sendFile(filePath);
});

// DELETE file route
app.delete('/files/:filename', async (req, res) => {
    const fileName = req.params.filename;    
    try {
      // Delete metadata from database
        await FileModel.findOneAndDelete({ filename: fileName });
        await FileStorage.findOneAndDelete({ filetitle: fileName });
        res.status(200).json({ message: 'File and metadata deleted successfully' });
      }catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file and metadata' });
      }
});

//EDIT file route
app.put('/files/:filename', async (req, res) => {
  const fileName = req.params.filename;
  const updatedDetails = req.body; 
  const metadataFilePath = path.join(__dirname, 'metadata.json');
  
  try {
    let metadata = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));

    const fileMetadata = metadata.find(file => file.filename === fileName);
    if (fileMetadata) {
      // Update the file's metadata with the updated details
      Object.assign(fileMetadata, updatedDetails);
      
      // Write the updated metadata back to the file
      fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
    } else {
      // If the file's metadata is not found, return an error response
      return res.status(404).json({ error: 'File not found' });
    }

    // Update the FileModel in MongoDB
    await FileModel.findOneAndUpdate({ filename: fileName }, updatedDetails);
    await FileStorage.findOneAndUpdate({ filetitle: fileName }, { file_url: updatedDetails.file_url });

    res.status(200).json({ message: 'File details updated successfully' });
  } catch (error) {
    console.error('Error updating file details:', error);
    res.status(500).json({ error: 'Failed to update file details' });
  }
});


// GET all news
app.get('/news', async (req, res) => {
  try {
    const allNews = await News.find();
    res.json(allNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new news
app.post('/news', async (req, res) => {
  try {
    const { title, link } = req.body;
    const newNews = new News({ title, link });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE news by title
app.delete('/news/:title', async (req, res) => {
  try {
    const { title } = req.params;
    await News.deleteOne({ title: title });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for uploading images
app.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    const { imageName } = req.body;
    const imageType = req.file.mimetype;
    const imagePath = req.file.path; // Get the path of the uploaded image

    // Save the image path to the database
    const newImage = new ImageModel({
      imageName: imageName,
      imagePath: imagePath, // Store the image path instead of buffer
      imageType: imageType
    });

    await newImage.save();

    res.status(201).json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Endpoint to fetch all uploaded images
app.get('/images', async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Endpoint to delete an uploaded image by ID
app.delete('/images/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await ImageModel.findById(imageId);

    // Delete the image file from local storage
    fs.unlinkSync(image.imagePath);

    // Delete the image record from the database
    await ImageModel.findByIdAndDelete(imageId);

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});