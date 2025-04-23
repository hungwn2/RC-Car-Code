const express=require('express');
const multer=require('multer');
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const dotenv=require('dotenv').config();
const path=require('path');
const app=express();
const port=3000;
const path=require("node:path");
const passport=require("passport");
const {PrimsaSessionStore}=require("@quixo/prisma-session-store");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'file_uploads',
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
  },
});

const upload=multer({storage});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(
  session({
      cookie: {
          maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
          checkPeriod: 2 * 60 * 1000, //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
      }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Set up to be able to access currentUser from local variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));