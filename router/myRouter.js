// จัดการ router
const express = require('express');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
const { colours } = require('nodemon/lib/config/defaults');
const router = express.Router();
// เรียกใช้งานโมเดล
const product = require('../models/products');
// const path = require("path");
// อัพโหลดไฟล์
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products'); // ตำแหน่งไฟล์
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); // เปลียนชื่อไฟล์ ป้องกันชื่อซ้ากัน
  }
});

// เริ่มต้น upload
const upload = multer({
  storage: storage
})

/* 
const name = 'yo';
 const add = '<h3>banbkok</h3>';
const age = 20;
 const product = ['A', 'B', 'C'];
const product = [
  { name: 'โน๊ตบุ๊ค', price: 25000, image: 'images/products/product1.png' },
  { name: 'เสื้อผ้า', price: 800, image: 'images/products/product2.png' },
  { name: 'หูฟัง', price: 1200, image: 'images/products/product3.png' }
];
*/

router.get('/', (req, res) => {
  product.find().exec((err, doc) => {
    res.render('index', { product: doc });
  });
});

router.get('/addform', (req, res) => {
  if (req.session.login) {
    res.render('form'); // บันทึกสินค้า
  } else {
    res.render('admin'); // เข้าสู่ระบบ
  }
});

router.get('/manage', (req, res) => {
  if (req.session.login) {
    product.find().exec((err, doc) => {
      res.render('manage', { product: doc });
    });
  } else {
    res.render('admin'); // เข้าสู่ระบบ
  }
});

router.get('/delete/:id', (req, res) => {
  product.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(err => {
    if (err) console.log(err);
    res.redirect('/manage');
  });
});

// logout
router.get('/logout', (req, res) => {
  /* res.clearCookie('username');
  res.clearCookie('password');
  res.clearCookie('login');
  res.redirect('/manage');
  */
  req.session.destroy((err) => {
    res.redirect('/manage');
  });
});

// get req.query , post req.body
router.post('/insert', upload.single('image'), (req, res) => {
  let data = new product({
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
    description: req.body.description
  });
  product.saveProduct(data, (err) => {
    if (err) console.log(err);
    res.redirect('/');
  });
});

router.get('/:id', (req, res) => {
  const product_id = req.params.id;
  product.findOne({ _id: product_id }).exec((err, doc) => {
    res.render('product', { product: doc });
  });
});

router.post('/edit', (req, res) => {
  const edit_id = req.body.edit_id;
  product.findOne({ _id: edit_id }).exec((err, doc) => {
    // นำข้อมูลเดิมที่ต้องการแก้ไข ไปแสดงในฟอร์ม
    res.render('edit', { product: doc });
  });
});

router.post('/update', (req, res) => {
  // ข้อมูลที่อยู่ในฟอร์มแก้ไข
  const update_id = req.body.update_id
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  }
  // อัตเดตข้อมูล
  product.findByIdAndUpdate(update_id, data, { useFindAndModify: false }).exec((err) => {
    if (err) console.log(err);
    res.redirect('/manage');
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const timeExpire = 10000; // 10 วินาที

  if (username == "admin" && password == '1234') {
    // สร้าง cookie
    /*res.cookie('username', username, { maxAge: timeExpire });
    res.cookie('password', password, { maxAge: timeExpire });
    res.cookie('login', true, { maxAge: timeExpire }); // true => login เข้าสู่ระบบ
    */
    req.session.username = username;
    req.session.password = password;
    req.session.login = true;
    req.session.cookie.maxAge = timeExpire;
    res.redirect('/manage');
  } else {
    res.render('404');
  }
});

module.exports = router;

/*
router.get('/', (req, res) => {
  res.status(200);
  res.type('text/html');
  res.sendFile(path.join(__dirname, '../templates/index.html'));
});

router.get('/product/:id', (req, res) => {
  const product_id = req.params.id;

  if (product_id === '1') {
    res.sendFile(path.join(__dirname, '../templates/product1.html'));
  } else if (product_id === '2') {
    res.sendFile(path.join(__dirname, '../templates/product2.html'));
  } else if (product_id == '3') {
    res.sendFile(path.join(__dirname, '../templates/product3.html'));
  }
  else {
    // res.status(404);
    res.redirect('/');
  }
}); 
*/