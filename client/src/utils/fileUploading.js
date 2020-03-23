const express = require("express");
const router = express.Router();
import axios from "axios";
import multer from "multer";

 //FILE UPLOADING START
  // configuring Multer to use files directory for storing files
  // this is important because later we'll need to access file path
  //We have to hold the file temporarily before we send it to the REST API so that we can provide a full path to the files.
  //also generate unique file names
  const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  // express route where we receive files from the client
  // passing multer middleware
  //When the route receives a file, it goes through the middleware first and is stored in our /files directory with a newly generated file name. When we get to the callback, the file is available as part of the req object.
  router.post('/files', upload.single('file'), (req, res) => {
  const file = req.file; // file passed from client
  const meta = req.body; // all other values passed from the client, like name, etc..
  
  // send the data to our REST API
  axios({
      url: `/api/uploads`,
      method: 'post',
      data: {
        file,
        name: meta.name,      
      },
    })
    .then(response => res.status(200).json(response.data.data))
    .catch((error) => res.status(500).json(error.response.data));
  });
  //FILE UPLOADING END