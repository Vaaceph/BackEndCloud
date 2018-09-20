const AWS = require('aws-sdk');
const env = require('./s3.env.js');
 console.log("***** process.env.AWS_ACCESS_KEY_ID: ", process.env.AWS_ACCESS_KEY_ID);
 console.log("***** process.env.AWS_SECRET_ACCESS_KEY: ", process.env.AWS_SECRET_ACCESS_KEY);
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region : 'us-east-1'
});

 
module.exports = s3;