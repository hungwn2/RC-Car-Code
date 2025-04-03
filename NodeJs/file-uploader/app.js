const express=require('express');
const path=require('path');
const fs=require('fs');
const multer=require('multer');
const fileUplaod=require('express0fileupload');
const app=express();
const port=3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage=multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uplads/');
    },
    filename: function (res, file, c){
        // Create unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
    
    const fileFilter=(req, file, cb)=>{
        const allowedFileTypes=['image/jpeg', 'image/png', 'image/gif', 
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'];
    if (allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    }
    else{
    cb(new Error('File type not supported'));
    }
};
