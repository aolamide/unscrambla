const http = require('http');

//simple http server that just redirects to unscrambla.aolamide.tech
const server = http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://unscrambla.aolamide.tech' });
    res.end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});