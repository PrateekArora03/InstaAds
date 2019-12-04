const path = require("path");
const multer = require("multer");

const checkFileType = (file, cb) => {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // check the ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mimetype
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};

// Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname + "/public/uploads/"),
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init upload
const upload = multer({
  storage,
  limits: {
    fileSize: { fileSize: 1000000 }
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("myImage");

module.exports = upload;
