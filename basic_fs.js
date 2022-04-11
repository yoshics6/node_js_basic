// blocking
const fs = require('fs');

/*
const data = fs.readFileSync('myfilse/show_data.txt', 'utf-8');
console.log(data);

const output_text = `5555\n${data}\nไฟล์ถูกเขียนเรียบร้อยแล้ว`;
fs.writeFileSync('myfilse/show_output.txt', output_text);
console.log('เขียนไฟล์แล้ว');
*/

// non blocking
fs.readFile('myfilse/show_data.txt', 'utf-8', (err, data) => {
  if (err) return console.log('เกิดข้อผิดพลาด', err);
  const output_text = `เขียนไฟล์\n${data}\nโว๊ยยยย`;
  fs.writeFile('myfilse/show_non_text.txt', output_text, err => {
    if (err) return console.log('เกิดข้อผิดพลาด', err);
    console.log('เขียนไฟล์เรียบร้อย');
  });
});