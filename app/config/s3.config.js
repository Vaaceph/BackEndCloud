const AWS = require('aws-sdk');
const env = require('./s3.env.js');
 
const s3 = new AWS.S3({
	region : env.REGION
});

 
module.exports = s3;