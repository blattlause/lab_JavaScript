const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './static/lab8-4.html';
    } else {
        filePath = path.join('./static', req.url);
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
