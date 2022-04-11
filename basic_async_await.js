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

async function start() {
  console.log(await downloadfile(url));
  console.log(await downloadfile(url1));
}

start();