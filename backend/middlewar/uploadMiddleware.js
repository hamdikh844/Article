const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createError = require('http-errors'); // Consider using http-errors for consistent error objects

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads/articles');
    
    try {
      // Create directory if it doesn't exist (with recursive option)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Verify directory was created successfully
      if (!fs.existsSync(uploadDir)) {
        return cb(new Error('Failed to create upload directory'));
      }
      
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      const originalName = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
      cb(null, `${originalName}-${uniqueSuffix}${ext}`);
    } catch (err) {
      cb(err);
    }
  }
});

// Validate file type
const fileFilter = (req, file, cb) => {
  try {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];

    const isValidMimeType = allowedTypes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.includes(fileExt);

    if (isValidMimeType && isValidExtension) {
      cb(null, true);
    } else {
      cb(createError(400, 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed'), false);
    }
  } catch (err) {
    cb(err);
  }
};

// Error handler for multer
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(createError(413, 'File too large. Maximum size is 5MB'));
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(createError(400, 'Too many files. Only one file is allowed'));
    }
    return next(createError(400, err.message));
  } else if (err) {
    return next(createError(500, 'File upload failed'));
  }
  next();
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1,
    parts: 20 // Limit number of parts (fields + files)
  }
}).single('image'); // Explicitly handle single file upload for 'image' field

// Combined middleware that handles both upload and errors
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return handleMulterErrors(err, req, res, next);
    }
    next();
  });
};

module.exports = uploadMiddleware;