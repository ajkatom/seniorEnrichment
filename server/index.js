const app = require("./app");
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`listening on ${port}`));
