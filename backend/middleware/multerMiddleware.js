// config/multer.js
const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) cb(null, true);
    else cb(new Error('Seuls les fichiers JPEG, JPG, ou PNG sont autorisés.'));
  },
});

module.exports = upload;
