const connect = true;
const url = 'yo/json';
const url1 = 'yo1/json';

function downloadfile(url) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (connect) {
        resolve(`โหลด ${url} เรียบร้อย`);
      } else {
        reject('เกิดข้อผิดพลาด');
      }
    }, 2000);
  });
}

/*
downloadfile(url).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
}).finally(() => {
  console.log('จบการทำงาน');
});
*/

downloadfile(url).then(function (result) {
  console.log(result);
  return downloadfile(url1);
}).then(function (result) {
  console.log(result);
});