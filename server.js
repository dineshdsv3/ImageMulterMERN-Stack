var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
require('./db')
var Image = require('./imageModel');

app.use(cors())
app.use('/public',express.static('public'))

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

app.get('/allImages', (req,res) => {
    Image.find((err, result) => {
       if(!err) {
       console.log(result);
        res.send(result)
       } 
    })
})

app.listen(8000, function() {

    console.log('App running on port 8000');

});