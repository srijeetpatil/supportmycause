var http = require("http");
var server = http.createServer(app);
var app = require("../app");

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*", // add a host, protect from intruders
  },
});

// Stores all user's socketId
var users = {};

io.on("connection", (socket) => {
  let UID;

  // New session every time user uses the website
  socket.on("CONFIG", (data) => {
    let { uid } = data;
    UID = uid;
    if (uid in users) {
      delete users[uid];
    }
    users[uid] = socket.id;
  });

  // Send a new message to other user
  socket.on("MESSAGE", (data) => {
    let { message, reciever, sender } = data;
    io.to(users[reciever]).emit("NEW_MESSAGE", { message, reciever, sender });
  });

  // Remove UID once user closes the website
  socket.once("disconnect", () => {
    delete users[UID];
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = server;
