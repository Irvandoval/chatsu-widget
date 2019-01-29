const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);

app.use(express.static('dist', {index: 'demo.html', maxAge: '4h'}));

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port:' + (process.env.PORT || 3000));
});