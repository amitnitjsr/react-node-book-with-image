const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const UserModel = require('./models/User')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/employee')

const storage = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null, 'public/Images');
    },
    filename: (req,file, cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({
    storage:storage
});

app.post('/upload', upload.single('file'), (req, res)=>{
   
    UserModel.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    image: req.file.filename
    })
    .then(result=>
        res.json(result)
    )
    .catch(error=>console.log(error))
});

// http://localhost:3001/getBooks?page=${page}&perpage=${perpage}
app.get('/getBooks',(req,res)=>{
    const page = req.query.page || 0;
    const perPage = req.query.perpage || 2;
   
    UserModel.find().skip(page * perPage).limit(perPage)
    .then(users=> res.status(200).json({data: users}))
    .catch(error=>console.log(error))
});

app.listen(3001, () =>
  console.log(`Server running at port: ${3001}`)
);

