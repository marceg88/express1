const http = require('http')

const users = []

const server = http.createServer((req, res) => {
    const url = req.url; //requerimiento path
    //Se debe de enviar cada linea del codigo html
    
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>');
        res.write('<head><title>Node Server</title></head>');
        res.write(
            '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end()
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node Server</title></head>');
        res.write('<body>');
        res.write('<ul>');
        users.forEach((user) => {
          res.write(`<li>${user}</li>`);
        });
        res.write('</ul>');
        res.write('<body>');
        res.write('</html>');
        return res.end();
      }
      // Send a HTML response with some "Page not found text
    if (url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            // Para transformar el buffer en información
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
            users.push(parsedBody.split('=')[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
});
    
server.listen(3000);

