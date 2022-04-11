const { write } = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  const partname = req.url;
  if (partname === '/' || partname === '/home') {
    const name = `<h1>hello node.js</h1>
  <p style="color:red">apiwat pothong || 2022</p>
  `;
    res.end(name);
  }
  else if (partname === '/product') {
    res.end('hi product')
  }
  else {
    res.writeHead(404);
    res.end('nooo');
  }
})

server.listen(3000, 'localhost', () => {
  console.log('start server in port 3000');
});