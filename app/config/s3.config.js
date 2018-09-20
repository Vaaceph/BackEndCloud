const AWS = require('aws-sdk');
const env = require('./s3.env.js');
 
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region : env.REGION
});

 
module.exports = s3;