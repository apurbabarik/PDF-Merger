// const express = require('express')
// const path = require('path')
// const merger = require('./merge')
// const app = express()
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const port = 3000

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,"templates/index.html"))
// })

// app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
// console.log(req.files);
// res.send({data:req.files})
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {mergePdfs} from '../PDF-Merger/merge.js'
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use('/static', express.static('public'))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./templates/index.html"))
});
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files);
   await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect("http://localhost:80/static/merged.pdf")
  })

app.listen(80);