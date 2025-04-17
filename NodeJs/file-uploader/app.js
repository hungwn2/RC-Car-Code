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

app.get('/', (req, res)=>{
  res.render('index', {uploadedUrl:null});
})

app.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, mimetype, path: url } = req.file;

  await prisma.uploadedFile.create({
    data: {
      url: url,
      filename: originalname,
      mimetype: mimetype,
    },
  });

  res.render('index', { uploadedUrl: url });
});

app.get('/files', async (req, res) => {
  const files = await prisma.uploadedFile.findMany({
    orderBy: { uploaded: 'desc' },
  });
  res.render('files', { files });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
