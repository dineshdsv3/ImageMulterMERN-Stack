var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
require('./db')
var Image = require('./imageModel');

app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file')

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           const image = new Image({productImage: req.files[0].path})
           image.save().then(result => {
               console.log(result)
               res.send({message:"Image Added to DB"})
           })
    //  console.log(res.file)

    })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});