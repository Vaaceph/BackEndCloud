const AWS = require('aws-sdk');
 console.log("***** process.env.AWS_ACCESS_ID: ", process.env.AWS_ACCESS_ID);
 console.log("***** process.env.AWS_SECRET_ACCESS_KEY: ", process.env.AWS_SECRET_ACCESS_KEY);
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region : 'us-east-1',
    bucket: 'saed-files'
});

 
module.exports = s3;