const server = require('./server');
const port = process.env.PORT || 8081;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
