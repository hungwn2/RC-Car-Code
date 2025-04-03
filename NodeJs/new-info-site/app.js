require('dotenv').config();

const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }
    else if (req.url == "about") {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }
    else if (req.url == "contact-me") {
        fs.readFile(path.join(__dirname, 'public', 'contact-me.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }
    else {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(content, 'utf8');
                    });
                }
                else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            }
            else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
