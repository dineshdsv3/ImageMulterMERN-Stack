var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');
var bodyParser = require('body-parser');
require('./db');
var Image = require('./imageModel');

app.use(bodyParser.json({ limit: '10mb', extended: true })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // support encoded bodies

app.use(cors());
app.use('/public', express.static('public'));

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

var upload = multer({ storage: storage }).array('file');

app.post('/upload', function (req, res) {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		const image = new Image({ productImage: req.files[0].path });
		image.save().then((result) => {
			console.log(result);
			res.send({ message: 'Image Added to DB' });
		});
		//  console.log(res.file)
	});
});

app.post('/uploadBase64', (req, res) => {
	// console.log('hello');
    // console.log(req.body.body.id)
    // var buffer = new Buffer(req.body.body.image, "base64")
    // console.log((buffer))

	const image = new Image({
		id: req.body.body.id,
		name: req.body.body.name,
		productImage: req.body.body.image,
    });
    image.save().then((result) => {
        console.log(result);
        res.send({ message: 'Image Added to DB' });
    });
});

app.get('/allImages', (req, res) => {
    console.log("all images")
	Image.find((err, result) => {
		if (!err) {
			console.log(result);
			res.send(result);
		}
	});
});

app.listen(8000, function () {
	console.log('App running on port 8000');
});
