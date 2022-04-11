// ให้บริหาร
function getTimes() {
  return new Date();
}

function cal(x, y) {
  return x * y;
}

function formatsNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// ส่งออกคำสั่งไปใช้
module.exports.getTimes = getTimes;
module.exports.cal = cal;
module.exports.formatsNumber = formatsNumber;