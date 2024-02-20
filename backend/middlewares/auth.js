const User = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Define storage and file filter for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
  },
});

exports.isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Auth Header:', authHeader); // Add this line for debugging

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token); // Add this line for debugging

  if (!token) {
    return res.status(401).json({ message: 'Token is missing in the Authorization header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded); // Add this line for debugging

    req.user = await User.findById(decoded.id);
    console.log('User:', req.user); // Add this line for debugging

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to access this resource` });
    }
    next()
  }
}