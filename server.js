const express = require('express');
const app = express();

// const cors = require('cors')
// const corsOptions = {
//   origin: ['http://localhost:4200', 'my-balancer-1996715571.us-west-2.elb.amazonaws.com:8080', 'sdk-load-balancer-926477216.us-west-2.elb.amazonaws.com:8080'],
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  console.log("Health Check!!");
  res.send('ok');
});


 
let router = require('./app/routers/s3.router.js');
app.use('/', router);
 
// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})