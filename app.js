// run server on node.js
/*
const http = require('http');
const fs = require('fs');
const url = require('url');

const web = fs.readFileSync(`${__dirname}/templates/index.html`);
const web_pro1 = fs.readFileSync(`${__dirname}/templates/product1.html`);
const web_pro2 = fs.readFileSync(`${__dirname}/templates/product2.html`);
const web_pro3 = fs.readFileSync(`${__dirname}/templates/product3.html`);

const server = http.createServer((req, res) => {

  const { pathname, query } = url.parse(req.url, true)

  if (pathname === '/' || pathname === '/home') {
    res.end(web);
  }
  else if (pathname === '/product') {
    if (query.id === '1') {
      res.end(web_pro1);
    }
    else if (query.id === '2') {
      res.end(web_pro2);
    }
    else if (query.id === '3') {
      res.end(web_pro3);
    }
  }
  else {
    res.writeHead(404);
    res.end('nooo');
  }
})

server.listen(3000, 'localhost', () => {
  console.log('start server in port 3000');
});c
*/

// ใช้ run server on express
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./router/myRouter');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ใช้ค่า post
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "mysession", resave: false, saveUninitialized: false }));
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log("รัน server ที่ port 3000")
});