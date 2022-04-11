/* console.log('เริ่มทำงาน');
setTimeout(() => {
  console.log('กำลังโหลด');
}, 2000);
console.log('จบการทำาน');
*/
const url = 'fileyo.json';
const url1 = 'fileyo1.json';

function downloadfile(url, callback) {
  console.log(`กำลังโหลด ${url}`)
  setTimeout(() => {
    callback(url);
  }, 2000);
}

downloadfile(url, function (result) {
  console.log(`ดาวน์โหลด ${result} เรียบร้อย`);
  downloadfile(url1, function (result) {
    console.log(`ดาวน์โหลด ${result} เรียบร้อย`);
  });
});