const s3 = require('../config/s3.config.js');
const mysql = require('mysql');
const AWS = require('aws-sdk');
const s3Bucket = 'saed-files';

const connection = mysql.createConnection({
	host: 'saed.czgpm4nqulz8.us-west-2.rds.amazonaws.com',
	port: '3306',
	user: 'wasifkhan',
	password: 'Fulda123!',
	database: 'saed'
});

exports.doUpload = (req, res) => {
	console.log("***** process.env: ", process.env);
	console.log(s3);
	const params = {
		Bucket: s3Bucket,
		Key: req.file.originalname,
		Body: req.file.buffer
	}

	s3.upload(params, (err, data) => {
		if (err) {
			res.status(500).send("Error -> " + err);
			return;
		}

		var filePath = data.Location; 
		var fileName = req.file.originalname;
		var userId = req.body.UserId;
		var fileAlreadyExists = false;

		if(!connection._connectCalled ) {
			connection.connect();
		}
		connection.query("SELECT * FROM saed.userfiles where UserId = '" + userId + "';", (err, rows, fields) => {

			if(err) {
				res.status(400).send("Error -> " + err);
			} else {
				rows && rows.forEach(row => {
					if(row.FileName == fileName) {
						fileAlreadyExists = true;
					}
				});
			}

			if(!fileAlreadyExists){
				connection.query("INSERT INTO saed.userfiles (FileName, FilePath, UserId) VALUES ('" + fileName + "', '" + filePath + "', '" + userId + "');",
				(err, rows, fields) => {
					if(err) {
						res.status(400).send("Error -> " + err);
					} else {
						res.send("File uploaded successfully! -> keyname = " + req.file.originalname);
					}
				});
			}
		});
	});
}

exports.listKeyNames = (req, res) => {
	const params = {
		Bucket:  s3Bucket
	}

	var keys = [];
	var databaseRows = [];
	var userId = req.query.userid;

	if(!connection._connectCalled ) {
		connection.connect();
	}

	connection.query("SELECT * FROM saed.userfiles where UserId = '" + userId + "';",
	(err, rows, fields) => {
		if (err) throw err
			rows && rows.forEach(row => {
				if(row.UserId == userId) {
					databaseRows.push(row.FileName);
				} 
			})
			
		// connection.end();
		res.send(databaseRows);
	});
	
	// s3.listObjectsV2(params, (err, data) => {
	// 	if (err) {
	// 		console.log(err, err.stack); // an error occurred
	// 		res.send("error -> " + err);
	// 	} else {
			
	// 		var contents = data.Contents;
	// 		contents.forEach(function (content) {
	// 			keys.push(content.Key);
	// 		});
	// 		res.send(databaseRows);
	// 	}
	// });
}

exports.doDownload = (req, res) => {
	const params = {
		Bucket:  s3Bucket,
		Key: req.params.filename
	}

	res.setHeader('Content-Disposition', 'attachment');

	s3.getObject(params)
		.createReadStream()
		.on('error', function (err) {
			res.status(500).json({ error: "Error -> " + err });
		}).pipe(res);
}