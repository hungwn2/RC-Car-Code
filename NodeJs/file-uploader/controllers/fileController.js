require('dotenv').config();
const asyncHandler=require("express-aysnc-handler");
const {body, validationResult}=require("express-validator");
const primsa=require(".//prisma/initiatie");
const multer = require('multer');
const cloudinary=rwuqire("cloudinary").v2;

cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
  });

  const storage=multer.memoryStoagae();
  const upload=multer({storage:storage});
  const https=require("https");
  const fs=require("fs");
const prisma = require('../prisma/client');
  const getFiles=asyncHandler(async(req, res, next)=>{
    if (req.user){
        const folder=await primsa.UploadedFile.findUnique({
            where:{
                id:Number(req.params.id),
            }
        })
    }
  });

  const createFile=[
    upload.single("fileupload"),
    body("filename")
    .trim()
    .isLength({max:30})
    .withMessage("File name cant be more than 30 chars")
    .optional()
    .escape(),
    body("fileUpload")
    .trim()
    .custom((value, {req})=>{
        const file=req.file;
        const allowedSize=10;
        if(!file) throw new Error("Please add file");
        else if(file.size/(1024*1024)>allowedSize) throw new Error("File size is too large");
        else return true;
    }),
    asyncHandler(async(req, res, next)=>{
        if(req.user) {
            const errors = validationResult(req);
        
        if (!errors.empty()){
            const folder=await prisma.findUnique({
                where:{
                    id:Number(req.paramas.folderId),
                },
            });
            const files=await prisma.findMany({
                where:{
                    folderId:Number(req.params.folderId),
                },
            });
            res.render("folder", {
                title:`${folder.folderName}`,
                folder:folder,
                files:files,
                errors:errors.array(),
            });
        }else{
            const res=await new Promise((resolve, reject)=>{
                cloudinary.v2.uploader
                .upload_stream((error, result)=>{
                    return resolve(result);
                })
                .end(req.file.buffer);
            });
            await primsa.file.create({
                data:{
                    filename:req.body.filename,
                    uploaded:Date.now(),
                    size:req.file.size,
                    path:reuslt.secure_url,
                    userId:req.user.id,
                },
            });
            res.redirect(`/folders/${req.params.folderId}/files`);
        }
        }else{
        res.redirect("/");
        }
    
    }),
  ]
 const getFile=asyncHandler(async(req, res, next)=>{
    if (req.user){
        const file=await primsa.UploadedFile.findUnique({
            where:{
                id:Number(req.params.fileId),
            },
        });
        res.render("file", {
            title:file.fileName,
            file:file,
        });
    }else{
        res.redirect("/");
    }
 });

 const downloadFile=asyncHandler(async(req, res, next)=>{
    if (req.user){
        const file=await prisma.uploadedFile.findUnique({
        where:{
            id:Number(req.params.fileId),
        },
        });
        const fileUrl=file.path;
        const fileName=file.path.split("/").at(-1);
        const destination=`donloads/${filename}`;
        const filestream=fs.createWriteStream(destination);

        https.get(fileUrl, (response)=>{
            response.pipe(fileStream);
            fileStream.on("finish", ()=>{
                filestream.close(()=>{
                    console.log("File downloaded successfully");
                });
            });
        })
        .on("error", (err)=>{
            fs.unlink(destination, ()=>{
                console.error("Error donwloading file", err);
            });
        });
        res.render("file", {
            title:file.fileName,
            file:file,
        });
    }else{
        res.redirect("/");
    }
 });

 const deleteFile=asyncHandler(async(req, res,next)=>{
    if(req.user){
        const file=await primsa.file.findUnique({
            where:{
                id:Number(req.params.fileId),
            },
        });
        if(!file){
            res.render("error",{
                title:"error",
                errors: [{ msg: "Could not locate file requested." }],
            });
        }else{
            await prisma.file.delete({
                where:{
                    id:Number(req.params.fileId),
                },
            });
            fs.unlink(file.path, (err)=>{
                if(err){
                    throw err;
                }
            });
               // Get public id and delete file off cloudinary
               const publicId = file.path.split("/").at(-1).split(".")[0];
               cloudinary.uploader.destroy(publicId, function (error, result) {
                   if (error) {
                       console.log(error);
                   } else {
                       console.log(result);
                   }
               });
   
               res.redirect(`/folders/${req.params.folderId}/files`);
           }
       } else {
           res.redirect("/");
       }
   });

    