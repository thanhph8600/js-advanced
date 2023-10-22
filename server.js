const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
var fs = require('fs');
// var upload = multer({ dest: "/frontend/static/upload/" });

const app = express();


app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.use(
  express.static(path.resolve(__dirname, "upload"))
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
module.exports = app;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'/frontend/static/upload'));
  },
  filename: function (req, file, cb) {
    let namefile =  Date.now()  + "-" +  file.originalname
    cb(null, namefile);
    req.nameFile = namefile
  },
});

var upload = multer({ storage: storage })

app.post("/upload",upload.single('formFile'), (req, res, next) => {
  return res.json({
    status: "up load file ok",
    nameFile: req.nameFile,
  });
});


app.post('/delete_file', function(req, res){
  var filePath = req.body.filePath; // đường dẫn tới tệp cần xóa
  console.log(filePath);
  fs.unlink(filePath, function(err){
      if(err){
          return res.status(500).send('An error occurred while deleting the file.');
      }
      res.send('File deleted successfully.');
  });
});


const cors = require("cors")
app.use(cors({
  origin : "*",

}))
const http = require("http").createServer(app);

const  io  = require("socket.io")(http,{
  cors: {
    origin : "*",
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });
});



app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "admin.html"));
});

http.listen(process.env.PORT || 3200, () => console.log("Server running..."));
