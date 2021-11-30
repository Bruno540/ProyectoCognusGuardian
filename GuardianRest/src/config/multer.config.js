const multer = require('multer');
const path = require('path');
const imageTypes = /jpeg|jpg|png|gif/;
const csvType = /csv/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(__basedir + '/uploads/');
      cb(null, __basedir + '/uploads/');
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
  });   
   
const upload = multer({
  storage: storage,
  fileFilter: function(_req, file, cb){
    checkFileImage(file, cb);
  }
});

const uploadCsv = multer({
  storage: storage,
  fileFilter: function(_req, file, cb){
    checkFileCsv(file, cb);
  }
});

function checkFileImage(file, cb){
  // Check extension
  const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mimetype
  const mimetype = imageTypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb(new Error('Solo se permiten imagenes'));
  }
}

function checkFileCsv(file, cb){
  const extname = csvType.test(path.extname(file.originalname).toLowerCase());
  if(extname){
    return cb(null,true);
  } else {
    cb(new Error('Solo se permiten archivos .csv'));
  }
}

module.exports = {
  upload,
  uploadCsv
};
